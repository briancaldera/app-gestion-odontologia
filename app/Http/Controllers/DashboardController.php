<?php

namespace App\Http\Controllers;

use App\Models\Historia;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            // TODO move this to a proper service... like a StatisticsService
            $usersCount = User::count();
            $historiasCount = Historia::count();
            $estudiantesCount = User::whereHasRole('estudiante')->count();
            $profesoresCount = User::whereHasRole('profesor')->count();
            return Inertia::render('Admin/Dashboard', [
                'usersCount' => $usersCount,
                'historiasCount' => $historiasCount,
                'estudiantesCount' => $estudiantesCount,
                'profesoresCount' => $profesoresCount,
            ]);
        } elseif ($user->hasRole('admision')) {
            return response(null, 404);
        } elseif ($user->hasRole('profesor')) {
            return response(null, 404);
        } elseif ($user->hasRole('estudiante')) {
            return Inertia::render('Estudiante/Dashboard');
        } else {
            return response(null, 403);
        }
    }
}
