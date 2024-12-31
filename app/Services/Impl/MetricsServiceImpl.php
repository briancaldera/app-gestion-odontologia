<?php

namespace App\Services\Impl;

use App\Models\Historia;
use App\Models\Paciente;
use App\Models\User;
use App\Services\MetricsService;
use App\Status;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class MetricsServiceImpl implements MetricsService
{

    public function getMetrics(): Collection
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
            '0' => $now->previous('month')->copy(),
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

        return collect([
            'patients' => [
                'created_last_6_months' => $patients_created_last_6_months,
            ],
            'total_patients' => $patients->count(),
            'total_female_patients' => $total_female_patients->count(),
            'total_male_patients' => $total_male_patients->count(),
            'total_ns_patients' => $total_ns_patients->count(),
            'total_patients_0_17' => $total_patients_0_17->count(),
            'total_patients_18_35' => $total_patients_18_35->count(),
            'total_patients_36_45' => $total_patients_36_45->count(),
            'total_patients_46_60' => $total_patients_46_60->count(),
            'total_patients_60' => $total_patients_60->count(),
            'total_historias' => $historias->count(),
            'historias_abiertas' => $historias_abiertas,
            'historias_cerradas' => $historias_cerradas,
            'tutors_with_assignees' => $tutors_with_assignees->count(),
            'tutors_without_assignees' => $tutors_without_assignees->count(),
            'total_users' => User::count(),
            'total_students' => User::whereHasRole('estudiante')->count(),
            'total_tutors' => $tutors->count(),
            'total_admision' => User::whereHasRole('admision')->count(),
            'total_admins' => User::whereHasRole('admin')->count(),
        ]);
    }
}
