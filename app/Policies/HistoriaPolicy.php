<?php

namespace App\Policies;

use App\Models\Historia;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class HistoriaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if ($user->hasRole('admision')) {
            return true;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Historia $historia): bool
    {
        if ($user->hasRole('estudiante') AND $historia->autor_id === $user->id) {
            return true;
        }

        if ($user->hasRole('profesor')) {
            return true;
        }

        if ($user->hasRole('admision')) {
            return true;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->hasRole('estudiante')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Historia $historia): bool
    {
        if ($user->hasRole('estudiante') AND $historia->autor_id === $user->id AND $historia->isOpen()) {
            return true;
        }

        if ($user->hasRole('admision')) {
            return true;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Historia $historia): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Historia $historia): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Historia $historia): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return false;
    }
}
