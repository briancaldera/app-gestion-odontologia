<?php

namespace App\Providers;

use App\Services\Impl\PacienteServiceImpl;
use App\Services\Impl\RadiografiaServiceImpl;
use App\Services\RadiografiaService;
use Illuminate\Support\ServiceProvider;

class RadiografiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(RadiografiaService::class, RadiografiaServiceImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
