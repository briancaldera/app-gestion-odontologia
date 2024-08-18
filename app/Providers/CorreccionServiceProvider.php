<?php

namespace App\Providers;

use App\Services\CorreccionService;
use App\Services\Impl\CorreccionServiceImpl;
use Illuminate\Support\ServiceProvider;

class CorreccionServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(CorreccionService::class, CorreccionServiceImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
