<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserCode;

class UserCodePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if ($user->hasPermission(['system-add-users-codes'])) {
            return true;
        }

        if ($user->hasPermission(['system-full-control'])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, UserCode $userCode): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->hasPermission(['system-add-users-codes'])) {
            return true;
        }

        if ($user->hasPermission(['system-full-control'])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, UserCode $userCode): bool
    {
        if ($user->hasPermission(['system-update-users-codes'])) {
            return true;
        }

        if ($user->hasPermission(['system-full-control'])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, UserCode $userCode): bool
    {
        if ($user->hasPermission(['system-remove-users-codes'])) {
            return true;
        }

        if ($user->hasPermission(['system-full-control'])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, UserCode $userCode): bool
    {
        if ($user->hasPermission(['system-remove-users-codes'])) {
            return true;
        }

        if ($user->hasPermission(['system-full-control'])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, UserCode $userCode): bool
    {
        if ($user->hasPermission(['system-remove-users-codes'])) {
            return true;
        }

        if ($user->hasPermission(['system-full-control'])) {
            return true;
        }

        return false;
    }
}
