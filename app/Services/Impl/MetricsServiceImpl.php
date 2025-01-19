<?php

namespace App\Services\Impl;

use App\Models\Group;
use App\Models\Historia;
use App\Models\Paciente;
use App\Models\User;
use App\Services\MetricsService;
use App\Status;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class MetricsServiceImpl implements MetricsService
{
    private const CACHE_INTERVAL = 3600;

    public function getMetrics(): Collection
    {
        return $this->calculateMetrics();
        //return Cache::remember('metrics', self::CACHE_INTERVAL, fn() => $this->calculateMetrics());
    }

    public function getMetricsForUser(User $user): Collection
    {
        $user_key = 'metrics_user_' . $user->id;

        return $this->calculateMetricsForUser($user);
        //return Cache::remember($user_key, self::CACHE_INTERVAL, fn() => $this->calculateMetricsForUser($user));
    }

    private function calculateMetrics(): Collection
    {
        $tutors = User::with(['group'])->whereHasRole('profesor')->get();

        $tutors_with_assignees = $tutors->filter(function ($tutor) {
            return $tutor->group->members->count() > 0;
        });

        $tutors_without_assignees = $tutors->filter(function ($tutor) {
            return $tutor->group->members->count() === 0;
        });

        $historias = Historia::all();
        $historias_abiertas = $historias->filter(fn(Historia $historia) => $historia->status === Status::ABIERTA)->count();
        $historias_cerradas = $historias->filter(fn(Historia $historia) => $historia->status === Status::CERRADA)->count();

        $patients = Paciente::all();

        $total_patients_0_17 = $patients->filter(fn(Paciente $paciente) => $paciente->edad < 18);
        $total_patients_18_35 = $patients->filter(fn(Paciente $paciente) => $paciente->edad > 17 and $paciente->edad < 36);
        $total_patients_36_45 = $patients->filter(fn(Paciente $paciente) => $paciente->edad > 35 and $paciente->edad < 46);
        $total_patients_46_60 = $patients->filter(fn(Paciente $paciente) => $paciente->edad > 45 and $paciente->edad < 61);
        $total_patients_60 = $patients->filter(fn(Paciente $paciente) => $paciente->edad > 60);

        $total_female_patients = $patients->filter(fn(Paciente $paciente) => $paciente->sexo === 'F');
        $total_male_patients = $patients->filter(fn(Paciente $paciente) => $paciente->sexo === 'M');
        $total_ns_patients = $patients->filter(fn(Paciente $paciente) => $paciente->sexo === 'NI');

        $now = now()->setTime(0, 0);

        $months = collect([
            '0' => $now->copy(),
            '1' => $now->previous('month')->copy(),
            '2' => $now->previous('month')->copy(),
            '3' => $now->previous('month')->copy(),
            '4' => $now->previous('month')->copy(),
            '5' => $now->previous('month')->copy(),
        ]);

        $patients_created_last_6_months = $months->map(fn(Carbon $datetime) => [
            'date' => $datetime,
            'count' => Paciente::whereMonth('created_at', $datetime->month)->whereYear('created_at', $datetime->year)->count(),
        ]);

        $students_with_open_HC = User::whereHasRole('estudiante')->whereHas('historias', fn($query) => $query->where('status', Status::ABIERTA))->count();

        return collect([
            'users' => [
                'tutors_with_assignees' => $tutors_with_assignees->count(),
                'tutors_without_assignees' => $tutors_without_assignees->count(),
                'total_users' => User::count(),
                'total_students' => User::whereHasRole('estudiante')->count(),
                'total_tutors' => $tutors->count(),
                'total_admision' => User::whereHasRole('admision')->count(),
                'total_admins' => User::whereHasRole('admin')->count(),
            ],
            'patients' => [
                'created_last_6_months' => $patients_created_last_6_months,
                'total_patients' => $patients->count(),
                'age' => [
                    'total_patients_0_17' => $total_patients_0_17->count(),
                    'total_patients_18_35' => $total_patients_18_35->count(),
                    'total_patients_36_45' => $total_patients_36_45->count(),
                    'total_patients_46_60' => $total_patients_46_60->count(),
                    'total_patients_60' => $total_patients_60->count(),
                ],
                'sex' => [
                    'total_female_patients' => $total_female_patients->count(),
                    'total_male_patients' => $total_male_patients->count(),
                    'total_ns_patients' => $total_ns_patients->count(),
                ],
            ],
            'historias' => [
                'students_with_open_HC' => $students_with_open_HC,
                'total_historias' => $historias->count(),
                'historias_abiertas' => $historias_abiertas,
                'historias_cerradas' => $historias_cerradas,
            ],
        ]);
    }

    private function calculateMetricsForUser(User $user): Collection
    {
        $now = now()->setTime(0, 0);

        $months = collect([
            '0' => $now->copy(),
            '1' => $now->previous('month')->copy(),
            '2' => $now->previous('month')->copy(),
            '3' => $now->previous('month')->copy(),
            '4' => $now->previous('month')->copy(),
            '5' => $now->previous('month')->copy(),
        ]);

        $patients_query = fn () => Paciente::where('assigned_to', $user->id);

        $total_patients_assigned_to_user = $patients_query()->count();
        $total_female_patients = $patients_query()->where('sexo', 'F')->count();
        $total_male_patients = $patients_query()->where('sexo', 'M')->count();
        $total_ns_patients = $patients_query()->where('sexo', 'NI')->count();

        $total_patients_0_17 = $patients_query()->where('edad', '<', 18)->count();
        $total_patients_18_35 = $patients_query()->where('edad', '>', 17)->where('edad', '<', 36)->count();
        $total_patients_36_45 = $patients_query()->where('edad', '>', 35)->where('edad', '<', 46)->count();
        $total_patients_46_60 = $patients_query()->where('edad', '>', 45)->where('edad', '<', 61)->count();
        $total_patients_60 = $patients_query()->where('edad', '>', 60)->count();

        $historia_query = fn() => Historia::where('autor_id', $user->id);

        $total_HC_created_by_user = $historia_query()->count();
        $total_open_HC_created_by_user = $historia_query()->where('status', Status::ABIERTA)->count();
        $total_closed_HC_created_by_user = $historia_query()->where('status', Status::CERRADA)->count();

        $groups_where_user_is_member = Group::whereJsonContains('members', $user->id)->count();

        return collect([
            'patients' => [
                'age' => [
                    'total_patients_0_17' => $total_patients_0_17,
                    'total_patients_18_35' => $total_patients_18_35,
                    'total_patients_36_45' => $total_patients_36_45,
                    'total_patients_46_60' => $total_patients_46_60,
                    'total_patients_60' => $total_patients_60,
                ],
                'sex' => [
                    'total_female_patients' => $total_female_patients,
                    'total_male_patients' => $total_male_patients,
                    'total_ns_patients' => $total_ns_patients,
                ],
                'total_patients' => $total_patients_assigned_to_user,
            ],
            'historias' => [
                'total_HC_created_by_user' => $total_HC_created_by_user,
                'total_open_HC_created_by_user' => $total_open_HC_created_by_user,
                'total_closed_HC_created_by_user' => $total_closed_HC_created_by_user,
            ],
            'academics' => [
                'groups' => [
                    'groups_where_user_is_member' => $groups_where_user_is_member,
                ]
            ],
        ]);
    }

    public static array $actions = [
        'metrics' => [
            'read' => [
                'name' => 'read',
                'display_name' => 'Leer estadísticas propias',
                'description' => 'Leer estadísticas propias del usuario'
            ],
            'read-all' => [
                'name' => 'read-all',
                'display_name' => 'Leer todas las estadísticas',
                'description' => 'Leer todas las estadísticas del sistema estadísticas'
            ],
            'full-control' => [
                'name' => 'full-control',
                'display_name' => 'Full control sobre estadísticas',
                'description' => 'Full control sobre las estadísticas'
            ],
        ]
    ];
}
