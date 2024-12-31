<?php

namespace App\Providers;

use App\Services\Impl\MetricsServiceImpl;
use App\Services\MetricsService;
use Illuminate\Support\ServiceProvider;

class MetricsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(MetricsService::class, MetricsServiceImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
