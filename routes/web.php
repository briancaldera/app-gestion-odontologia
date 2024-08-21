<?php

use App\Http\Controllers\CorreccionController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HistoriaController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ProfileController;
use App\Models\Group;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('General/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified', 'profile'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/create', [ProfileController::class, 'create'])->name('profile.create')->withoutMiddleware(['profile']);
    Route::post('/profile', [ProfileController::class, 'store'])->name('profile.store')->withoutMiddleware(['profile']);
    Route::patch('/profile/updatePicture', [ProfileController::class, 'updatePicture'])->name('profile.updatePicture');
});

Route::middleware(['auth', 'verified', 'profile'])->group(function () {

    Route::get('/dashboard', function (Request $request) {
        $user = $request->user();

        if ($user->isAdmin()) {
            return response(null, 404);
        } elseif ($user->isAdmision()) {
            return response(null, 404);
        } elseif ($user->isProfesor()) {
            return response(null, 404);
        } elseif ($user->isEstudiante()) {
            return Inertia::render('Estudiante/Dashboard');
        } else {
            return response(null, 403);
        }
    })->name('dashboard');

    Route::prefix('historias')->name('historias.')->group(function () {
        Route::post('/{historia}/correcciones', [CorreccionController::class, 'store'])->name('correcciones.store');
        Route::patch('/{historia}/correcciones/{correccion}', [CorreccionController::class, 'update'])->name('correcciones.update');
        Route::delete('/{historia}/correcciones/{correccion}', [CorreccionController::class, 'destroy'])->name('correcciones.destroy');
    });

    Route::prefix('grupos')->name('groups.')->group(function () {
        Route::post('', [GroupController::class, 'store'])->name('store')->can('create', Group::class);
        Route::delete('/{group}', [GroupController::class, 'destroy'])->name('destroy')->can('delete', 'group');

        Route::patch('/{group}/add', [GroupController::class, 'addMember'])->name('addMember')->can('addMember', 'group');
        Route::delete('/{group}/remove', [GroupController::class, 'removeMember'])->name('removeMember')->can('removeMember', 'group');
    });

    // Routes for admin
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {




    });

    // Routes for admision
    Route::middleware(['role:admision'])->prefix('admision')->name('admision.')->group(function () {




    });

    // Routes for profesor
    Route::middleware(['role:profesor'])->prefix('profesor')->name('profesor.')->group(function () {




    });

    // Routes for estudiante
    Route::middleware(['role:estudiante'])->group(function () {

        Route::resource('pacientes', PacienteController::class);

        Route::get('/historias', function (){

            return Inertia::render('Estudiante/Historia/Dashboard',[]);
        })->name('historia');

        Route::prefix('historias')->name('historias.')->group(function () {

            Route::get('/create', [HistoriaController::class, 'create'])->name('historia.create');

            Route::post('/{paciente}', [HistoriaController::class, 'store'])->name('store');
            Route::patch('/{historia}', [HistoriaController::class, 'update'])->name('update');

            Route::post('/{historia}/antfamiliares', [HistoriaController::class, 'storeAntFamiliares'])->name('storeAntFamiliares');
            Route::patch('/{historia}/antfamiliares', [HistoriaController::class, 'updateAntFamiliares'])->name('updateAntFamiliares');

            Route::post('/{historia}/antpersonales', [HistoriaController::class, 'storeAntPersonales'])->name('storeAntPersonales');
            Route::patch('/{historia}/antpersonales', [HistoriaController::class, 'updateAntPersonales'])->name('updateAntPersonales');

            Route::post('/{historia}/trastornos', [HistoriaController::class, 'storeTrastornos'])->name('storeTrastornos');
            Route::patch('/{historia}/trastornos', [HistoriaController::class, 'updateTrastornos'])->name('updateTrastornos');

            Route::post('/{historia}/odontologica', [HistoriaController::class, 'storeHistoriaOdontologica'])->name('storeHistoriaOdontologica');
            Route::patch('/{historia}/odontologica', [HistoriaController::class, 'updateHistoriaOdontologica'])->name('updateHistoriaOdontologica');

        });

    });

});

require __DIR__.'/auth.php';
