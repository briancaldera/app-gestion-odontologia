<?php

namespace App\Providers;

use App\Services\HistoriaService;
use App\Services\Impl\HistoriaServiceImpl;
use Illuminate\Support\ServiceProvider;

class HistoriaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(HistoriaService::class, HistoriaServiceImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
