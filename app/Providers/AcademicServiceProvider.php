<?php

namespace App\Providers;

use App\Services\AcademicService;
use App\Services\Impl\AcademicServiceImpl;
use Illuminate\Support\ServiceProvider;

class AcademicServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(AcademicService::class, AcademicServiceImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
