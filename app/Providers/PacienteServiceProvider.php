<?php

namespace App\Providers;

use App\Services\Impl\PacienteServiceImpl;
use App\Services\PacienteService;
use Illuminate\Support\ServiceProvider;

class PacienteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(PacienteService::class, PacienteServiceImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
