<?php

use App\Http\Controllers\CorreccionController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HistoriaController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ProfileController;
use App\Models\Group;
use App\Models\Historia;
use App\Models\User;
use App\Notifications\UserAddedToGroup;
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
    Route::get('/profile/index', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/{profile}', [ProfileController::class, 'show'])->name('profile.show');
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
            // TODO move this to a proper service... like a StatisticsService
            $usersCount = User::count();
            $historiasCount = Historia::count();
            $estudiantesCount = User::where('role', 3)->count();
            $profesoresCount = User::where('role', 2)->count();
            return Inertia::render('Admin/Dashboard', [
                'usersCount' => $usersCount,
                'historiasCount' => $historiasCount,
                'estudiantesCount' => $estudiantesCount,
                'profesoresCount' => $profesoresCount,
            ]);
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

    // Notifications routes
    Route::get('/notifications', [NotificationsController::class, 'getNotifications'])->name('notifications.index');
    Route::patch('/notifications/{id}', [NotificationsController::class, 'markAsRead'])->name('notifications.markAsRead');

    // Correccion routes
    Route::prefix('historias')->name('historias.')->group(function () {
        Route::post('/{historia}/correcciones', [CorreccionController::class, 'store'])->name('correcciones.store');
        Route::patch('/{historia}/correcciones/{correccion}', [CorreccionController::class, 'update'])->name('correcciones.update');
        Route::delete('/{historia}/correcciones/{correccion}', [CorreccionController::class, 'destroy'])->name('correcciones.destroy');
    });

    Route::prefix('grupos')->name('groups.')->group(function () {
        Route::get('/index', [GroupController::class, 'index'])->name('index')->can('viewAny', Group::class);
        Route::get('/{group}', [GroupController::class, 'show'])->name('show')->can('view', 'group');
        Route::post('', [GroupController::class, 'store'])->name('store')->can('create', Group::class);
        Route::delete('/{group}', [GroupController::class, 'destroy'])->name('destroy')->can('delete', 'group');

        Route::patch('/{group}/add', [GroupController::class, 'addMembers'])->name('addMembers')->can('addMember', 'group');
        Route::patch('/{group}/remove', [GroupController::class, 'removeMembers'])->name('removeMembers')->can('removeMember', 'group');
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

//    Routes for HCE
    Route::get('/historias/dashboard', [HistoriaController::class, 'dashboard'])->name('historias.dashboard');
    Route::get('/historias', [HistoriaController::class, 'index'])->name('historias.index');
    Route::get('/historias/crear', [HistoriaController::class, 'create'])->name('historias.create')->can('create', Historia::class);
    Route::post('/historias/store', [HistoriaController::class, 'store'])->name('historias.store')->can('create', Historia::class);
    Route::get('/historias/{historia}/editar', [HistoriaController::class, 'edit'])->name('historias.edit')->can('update', 'historia');
    Route::patch('/pacientes/{paciente}', [HistoriaController::class, 'updatePaciente'])->name('pacientes.update')->can('update', 'paciente');
    Route::patch('/historias/{historia}/antfamiliares/update', [HistoriaController::class, 'updateAntFamiliares'])->name('historias.antfamiliares.update')->can('update', 'historia');
    Route::patch('/historias/{historia}/antpersonales/update', [HistoriaController::class, 'updateAntPersonales'])->name('historias.antpersonales.update')->can('update', 'historia');
    Route::patch('/historias/{historia}/odontologica/update', [HistoriaController::class, 'updateHistoriaOdontologica'])->name('historias.odontologica.update')->can('update', 'historia');
    Route::patch('/historias/{historia}/odontologica/modelos/update', [HistoriaController::class, 'updateEstudioModelos'])->name('historias.odontologica.modelos.update')->can('update', 'historia');
    Route::patch('/historias/{historia}/odontologica/plan/update', [HistoriaController::class, 'updatePlanTratamiento'])->name('historias.odontologica.plantratamiento.update')->can('update', 'historia');
    Route::patch('/historias/{historia}/odontologica/modificaciones/update', [HistoriaController::class, 'updateModificacionesPlanTratamiento'])->name('historias.odontologica.modificacionestratamiento.update')->can('update', 'historia');
    Route::patch('/historias/{historia}/odontologica/secuencia/update', [HistoriaController::class, 'updateSecuenciaTratamiento'])->name('historias.odontologica.secuenciatratamiento.update')->can('update', 'historia');
    Route::patch('/historias/{historia}/odontologica/radiografias/update', [HistoriaController::class, 'updateExamenRadiografico'])->name('historias.odontologica.radiografias.update')->can('update', 'historia');

    // Get panoramicas
    Route::get('/historias/{historia}/odontologica/panoramicas/{id}', [HistoriaController::class, 'getPanoramica'])->name('historias.odontologica.panoramicas')->can('view', 'historia');

    Route::get('/historias/{historia}', [HistoriaController::class, 'show'])->name('historias.show')->can('view', 'historia');

    Route::middleware(['role:estudiante'])->group(function () {

//        Route::resource('pacientes', PacienteController::class);

//        Route::get('/historias', function (){
//
//            return Inertia::render('Estudiante/Historia/Dashboard',[]);
//        })->name('historia');

        Route::prefix('historias')->name('historias.')->group(function () {

            Route::get('/create', [HistoriaController::class, 'create'])->name('historia.create');

//            Route::post('/{paciente}', [HistoriaController::class, 'store'])->name('store');
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
