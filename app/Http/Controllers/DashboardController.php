<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Historia;
use App\Models\Paciente;
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
        /** @var User $user */
        $user = $request->user();

        if ($user->hasRole('admin') OR $user->hasRole('admision')) {
            // TODO move this to a proper service... like a StatisticsService

            $usersCount = User::count();
            $historiasCount = Historia::count();
            $estudiantesCount = User::whereHasRole('estudiante')->count();
            $profesoresCount = User::whereHasRole('profesor')->count();

            $statistics = [
                'historiasCreadas' => $historiasCount,
                'usuariosRegistrados' => $usersCount,
                'estudiantesRegistrados' => $estudiantesCount,
                'profesoresRegistrados' => $profesoresCount,
            ];

            return Inertia::render('Dashboard/Show', [
                'statistics' => $statistics,
            ]);
        } elseif ($user->hasRole('profesor')) {

            $gruposQueManejaQuery = Group::where('owner_id', $user->id);

            $gruposQueManejaCount = $gruposQueManejaQuery->count();
            $estudiantesAsignados = $gruposQueManejaQuery->get()->reduce(function (?int $carry, Group $group) {
                $estudiantesParaEsteGrupo = $group->members->reduce(function (?int $carry, User $user) {
                    if ($user->hasRole('estudiante')) $carry++;
                    return $carry;
                }, 0);
                return $estudiantesParaEsteGrupo;
            }, 0);


            $statistics = [
                'gruposQueManeja' => $gruposQueManejaCount,
                'estudiantesAsignados' => $estudiantesAsignados,
            ];

            return Inertia::render('Dashboard/Show',[
                'statistics' => $statistics,
            ]);
        } elseif ($user->hasRole('estudiante')) {

            $pacientesAsignadosCount = Paciente::where('assigned_to', $user->id)->count();
            $historiasCreadasCount = Historia::where('autor_id', $user->id)->count();

            $statistics = [
                'pacientesAsignados' => $pacientesAsignadosCount,
                'historiasCreadas' => $historiasCreadasCount,
            ];


            return Inertia::render('Dashboard/Show', [
                'statistics' => $statistics,
            ]);
        } else {
            return response(null, 403);
        }
    }
}
