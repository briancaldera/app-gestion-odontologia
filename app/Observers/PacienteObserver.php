<?php

namespace App\Observers;

use App\Models\Paciente;
use App\Models\User;
use App\Notifications\Paciente\PacienteCreated;
use Illuminate\Support\Facades\Log;

class PacienteObserver
{
    /**
     * Handle the Paciente "created" event.
     */
    public function created(Paciente $paciente): void
    {
        /** @var User $user */
        $user = request()->user();
        Log::stack(['single', 'actions'])->info("[Paciente|Creación]: Usuario @{username} [ID:{id}] ha registrado un nuevo paciente [ID:{pacienteID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'pacienteID' => $paciente->id
        ]);
        $user->notify(new PacienteCreated($paciente));

        $admin = User::whereHasRole(['admision', 'admin'])->get();
        $admin->each(fn(User $user) => $user->notify(new PacienteCreated($paciente)));
    }

    /**
     * Handle the Paciente "updated" event.
     */
    public function updated(Paciente $paciente): void
    {
        $user = request()->user();
        Log::stack(['single', 'actions'])->info("[Paciente|Actualización]: Usuario @{username} [ID:{id}] ha actualizado la información del paciente [ID:{pacienteID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'pacienteID' => $paciente->id
        ]);
    }

    /**
     * Handle the Paciente "deleted" event.
     */
    public function deleted(Paciente $paciente): void
    {
        $user = request()->user();
        Log::stack(['single', 'actions'])->info("[Paciente|Eliminación]: Usuario @{username} [ID:{id}] ha eliminado al paciente [ID:{pacienteID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'pacienteID' => $paciente->id
        ]);
    }

    /**
     * Handle the Paciente "restored" event.
     */
    public function restored(Paciente $paciente): void
    {
        $user = request()->user();
        Log::stack(['single', 'actions'])->info("[Paciente|Restauración]: Usuario @{username} [ID:{id}] ha restaurado al paciente [ID:{pacienteID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'pacienteID' => $paciente->id
        ]);
    }

    /**
     * Handle the Paciente "force deleted" event.
     */
    public function forceDeleted(Paciente $paciente): void
    {
        $user = request()->user();
        Log::stack(['single', 'actions'])->info("[Paciente|Forzar_eliminación]: Usuario @{username} [ID:{id}] ha forzado la eliminación del paciente [ID:{pacienteID}]", [
            'username' => $user->name,
            'id' => $user->id,
            'pacienteID' => $paciente->id
        ]);
    }
}
