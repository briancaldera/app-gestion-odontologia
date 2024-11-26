<?php

use App\Http\Controllers\CorreccionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HistoriaCirugiaController;
use App\Http\Controllers\HistoriaController;
use App\Http\Controllers\HistoriaEndodonciaController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\UserController;
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

    Route::get('/profile/index', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/create', [ProfileController::class, 'create'])->name('profile.create')->withoutMiddleware(['profile']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile', [ProfileController::class, 'store'])->name('profile.store')->withoutMiddleware(['profile']);
    Route::patch('/profile/updatePicture', [ProfileController::class, 'updatePicture'])->name('profile.updatePicture');
    Route::get('/profiles/{profile}/pictures/{id}', [ProfileController::class, 'getProfilePicture'])->name('profile.picture.show');
    Route::get('/profile/{profile}', [ProfileController::class, 'show'])->name('profile.show');

    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/usuarios/codigos', [UserController::class, 'indexCodes'])->name('users.codes.index');
    Route::post('/usuarios/codigos', [UserController::class, 'storeCode'])->name('users.codes.store');
    Route::patch('/usuarios/codigos/{userCode}', [UserController::class, 'updateCode'])->name('users.codes.update');
    Route::delete('/usuarios/codigos/{userCode}', [UserController::class, 'destroyCode'])->name('users.codes.destroy');

    // Notifications routes
    Route::get('/notifications', [NotificationsController::class, 'getNotifications'])->name('notifications.index');
    Route::patch('/notifications/{id}', [NotificationsController::class, 'markAsRead'])->name('notifications.markAsRead');

    // Correccion routes
    Route::prefix('historias')->name('historias.')->group(function () {
        Route::post('/{historia}/correcciones', [CorreccionController::class, 'store'])->name('correcciones.store');
        Route::patch('/{historia}/correcciones/{correccion}', [CorreccionController::class, 'update'])->name('correcciones.update');
        Route::delete('/{historia}/correcciones/{correccion}', [CorreccionController::class, 'destroy'])->name('correcciones.destroy');
    });

    Route::resource('groups', GroupController::class);
    Route::patch('/grupos/{group}/add', [GroupController::class, 'addMembers'])->name('groups.addMembers');
    Route::patch('/grupos/{group}/remove', [GroupController::class, 'removeMembers'])->name('groups.removeMembers');
    Route::post('/grupos/{group}/agregarTarea', [GroupController::class, 'storeAssignment'])->name('groups.assignments.store');
    Route::get('/grupos/{group}/asignaciones/{assignment}', [GroupController::class, 'showAssignment'])->name('groups.assignments.show');
    Route::post('/grupos/{group}/asignaciones/{assignment}/homework', [GroupController::class, 'storeHomework'])->name('groups.assignments.homeworks.store');
    Route::post('/grupos/{group}/asignaciones/{assignment}/homework/{homework}', [GroupController::class, 'addCorrectionsToDocument'])->name('groups.assignments.homeworks.corrections');

//    Routes for patient
    Route::resource('pacientes', PacienteController::class);
    Route::get('/pacientes/{paciente}/foto/{id}', [PacienteController::class, 'getFoto']);

//    Routes for HCE
    Route::get('/historias/dashboard', [HistoriaController::class, 'dashboard'])->name('historias.dashboard');
    Route::get('/historias', [HistoriaController::class, 'index'])->name('historias.index');
    Route::get('/historias/crear', [HistoriaController::class, 'create'])->name('historias.create');
    Route::post('/historias/store', [HistoriaController::class, 'store2'])->name('historias.store');
    Route::patch('/historias/{historia}', [HistoriaController::class, 'update'])->name('historias.update');
    Route::get('/historias/{historia}/editar', [HistoriaController::class, 'edit'])->name('historias.edit');
//    Route::patch('/pacientes/{paciente}', [HistoriaController::class, 'updatePaciente'])->name('pacientes.update');
    Route::patch('/historias/{historia}/antfamiliares/update', [HistoriaController::class, 'updateAntFamiliares'])->name('historias.antfamiliares.update');
    Route::patch('/historias/{historia}/antpersonales/update', [HistoriaController::class, 'updateAntPersonales'])->name('historias.antpersonales.update');
    Route::patch('/historias/{historia}/odontologica/update', [HistoriaController::class, 'updateHistoriaOdontologica'])->name('historias.odontologica.update');
    Route::patch('/historias/{historia}/odontologica/modelos/update', [HistoriaController::class, 'updateEstudioModelos'])->name('historias.odontologica.modelos.update');
    Route::patch('/historias/{historia}/odontologica/plan/update', [HistoriaController::class, 'updatePlanTratamiento'])->name('historias.odontologica.plantratamiento.update');
    Route::patch('/historias/{historia}/odontologica/modificaciones/update', [HistoriaController::class, 'updateModificacionesPlanTratamiento'])->name('historias.odontologica.modificacionestratamiento.update');
    Route::patch('/historias/{historia}/odontologica/secuencia', [HistoriaController::class, 'updateSecuenciaTratamiento'])->name('historias.odontologica.secuenciatratamiento.update');
    Route::post('/historias/{historia}/odontologica/secuencia/{id}/aprobar', [HistoriaController::class, 'approveSecuenciaTratamiento'])->name('historias.odontologica.secuenciatratamiento.approve');

    Route::patch('/historias/{historia}/odontologica/periodontal/update', [HistoriaController::class, 'updateHistoriaPeriodontal'])->name('historias.odontologica.periodontal.update');
    Route::post('/historias/{historia}/odontologica/periodontal/controlplaca', [HistoriaController::class, 'storeControlPlaca'])->name('historias.odontologica.periodontal.controlplaca.store');
    Route::post('/historias/{historia}/odontologica/periodontal/controlplaca/{id}/aprobar', [HistoriaController::class, 'approveControlPlaca'])->name('historias.odontologica.periodontal.controlplaca.approve');
    Route::post('/historias/{historia}/odontologica/periodontal/aprobar', [HistoriaController::class, 'approvePeriodontalDischarge'])->name('historias.odontologica.periodontal.approve');

    Route::patch('/historias/{historia}/odontologica/radiografias/update', [HistoriaController::class, 'updateExamenRadiografico'])->name('historias.odontologica.radiografias.update');
    Route::patch('/historias/{historia}/odontologica/periodontodiagrama/update', [HistoriaController::class, 'updatePeriodontodiagrama'])->name('historias.odontologica.periodontodiagramas.update');
    Route::post('/historias/{historia}/odontologica/media/store', [HistoriaController::class, 'storeOdontologiaMedia'])->name('historias.odontologica.media.store');

    Route::patch('/historias/{historia}/status/update', [HistoriaController::class, 'changeStatus'])->name('historias.update-status');

    // Consentimiento
    Route::patch('/historias/{historia}/odontologica/consentimiento/update', [HistoriaController::class, 'updateConsentimiento'])->name('historias.odontologica.consentimiento.update');
    Route::get('/historias/{historia}/odontologica/consentimiento/{id}', [HistoriaController::class, 'getConsentimiento'])->name('historias.odontologica.consentimiento.show');
    // Get panoramicas
    Route::get('/historias/{historia}/odontologica/panoramicas/{id}', [HistoriaController::class, 'getPanoramica'])->name('historias.odontologica.panoramicas');
    // Get coronales
    Route::get('/historias/{historia}/odontologica/coronales/{id}', [HistoriaController::class, 'getCoronales'])->name('historias.odontologica.coronales');
    // Get periapicales
    Route::get('/historias/{historia}/odontologica/periapicales/{id}', [HistoriaController::class, 'getPeriapicales'])->name('historias.odontologica.periapicales');
    // Get periodontodiagrama
    Route::get('/historias/{historia}/odontologica/periodontodiagrama/{id}', [HistoriaController::class, 'getPeriodontodiagrama'])->name('historias.odontologica.periodontodiagramas');
    // Get media
    Route::get('/historias/{historia}/odontologica/media/{id}', [HistoriaController::class, 'getMedia'])->name('historias.odontologica.media');

    Route::get('/historias/{historia}', [HistoriaController::class, 'show'])->name('historias.show');

    Route::patch('/historias/{historia}/odontologica/modificaciones/consentimiento', [HistoriaController::class, 'updateModificacionesConsentimiento'])->name('historias.odontologica.modificacionestratamiento.consentimiento.update');
    Route::post('/historias/{historia}/odontologica/modificaciones/{id}/aprobar', [HistoriaController::class, 'approveModificacion'])->name('historias.odontologica.modificacionestratamiento.approve');

    Route::get('/historias/{historia}/odontologica/modificaciones/consentimientos/{id}', [HistoriaController::class, 'getModificacionesConsentimiento'])->name('historias.odontologica.modificacionestratamiento.consentimiento');
    Route::get('/historias/{historia}/{action}', [HistoriaController::class, 'downloadHistoria'])->whereIn('action', ['download', 'print',])->name('historias.download');
    // Routes for HE
    Route::prefix('/endodoncia')->name('endodoncia.')->group(function() {
        Route::resource('historias', HistoriaEndodonciaController::class);
        Route::patch('/historias/{historia}/anamnesis', [HistoriaEndodonciaController::class, 'updateAnamnesis'])->name('historias.anamnesis.update');
        Route::patch('/historias/{historia}/dolor', [HistoriaEndodonciaController::class, 'updateEvaluacionDolor'])->name('historias.dolor.update');
        Route::post('/historias/{historia}/ficha', [HistoriaEndodonciaController::class, 'storeFicha'])->name('historias.ficha.store');
        Route::get('historias/{historia}/{file}/{id}', [HistoriaEndodonciaController::class, 'getFile'])->whereIn('file', ['consentimiento', 'periodontodiagrama'])->name('historias.file.show');
    });

    // Routes for HC
    Route::prefix('/cirugia')->name('cirugia.')->group(function() {
        Route::resource('historias', HistoriaCirugiaController::class)->except(['create']);
//        Route::get('historias/{historia}/consentimiento/{id}', [HistoriaCirugiaController::class, 'getConsentimiento'])->name('historias.consentimientos.show');
//        Route::get('historias/{historia}/periodontodiagrama/{id}', [HistoriaCirugiaController::class, 'getPeriodontodiagrama'])->name('historias.periodontodiagramas.show');
        Route::get('historias/{historia}/{file}/{id}', [HistoriaCirugiaController::class, 'getFile'])->whereIn('file', ['consentimiento', 'periodontodiagrama'])->name('historias.file.show');
    });
});

require __DIR__.'/auth.php';
