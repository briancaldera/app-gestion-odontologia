<?php

use App\Http\Controllers\HistoriaController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

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

        Route::prefix('historias')->name('historias.')->group(function () {
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
