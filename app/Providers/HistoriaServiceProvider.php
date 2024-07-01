<?php

namespace App\Providers;

use App\Services\HistoriaService;
use App\Services\HistoriaServiceImpl;
use Illuminate\Support\ServiceProvider;
use PHPUnit\TextUI\Application;

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
