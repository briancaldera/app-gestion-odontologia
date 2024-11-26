<?php

namespace App\Policies;

use App\Models\Paciente;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PacientePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if ($user->hasPermission('pacientes-read')) return true;

        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Paciente $paciente): bool
    {
        if ($user->hasPermission('pacientes-read') AND $paciente->assigned_to === $user->id) return true;

        if ($user->hasPermission('pacientes-full-control')) return true;

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->hasPermission('pacientes-create')) {
            return true;
        }

        if ($user->hasPermission('pacientes-full-control')) return true;

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Paciente $paciente): bool
    {
        if ($user->hasPermission('pacientes-update') AND $user->id === $paciente->assigned_to) return true;

        if ($user->hasPermission('pacientes-full-control')) return true;

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Paciente $paciente): bool
    {
        if ($user->hasPermission('pacientes-delete')) return true;

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Paciente $paciente): bool
    {
        if ($user->hasPermission('pacientes-delete')) return true;

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Paciente $paciente): bool
    {
        if ($user->hasPermission('pacientes-delete')) return true;

        return false;
    }
}
