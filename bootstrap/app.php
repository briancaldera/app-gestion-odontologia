<?php

use App\Http\Middleware\EnsureUserHasProfile;
use App\Http\Middleware\EnsureUserHasRole;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
           'role' => EnsureUserHasRole::class,
            'profile' => EnsureUserHasProfile::class,
        ]);

        $middleware->trustProxies(at: '*');
        $middleware->trustHosts(at: ['ugma-app-gestion-odontologia-96559078110.us-east1.run.app', 'ugma-app-gestion-odontologia-staging-96559078110.us-central1.run.app']);
        $middleware->statefulApi();
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
