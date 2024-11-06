<?php

namespace App\Providers\Odontologia\Cirugia;

use App\Services\HistoriaCirugiaService;
use App\Services\Impl\HistoriaCirugiaServiceImpl;
use Illuminate\Support\ServiceProvider;

class HistoriaCirugiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(HistoriaCirugiaService::class, HistoriaCirugiaServiceImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
