<?php

namespace App\Providers\Odontologia\Endodoncia;

use App\Services\HistoriaEndodonciaService;
use App\Services\Impl\HistoriaEndodonciaServiceImpl;
use Illuminate\Support\ServiceProvider;

class HistoriaEndodonciaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(HistoriaEndodonciaService::class, HistoriaEndodonciaServiceImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
