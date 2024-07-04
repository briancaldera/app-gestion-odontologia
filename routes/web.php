<?php

use App\Http\Controllers\HistoriaController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

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

        Route::prefix('historia')->name('historia.')->group(function () {
            Route::post('/{paciente}', [HistoriaController::class, 'store'])->name('store');
        });

    });

});

require __DIR__.'/auth.php';
