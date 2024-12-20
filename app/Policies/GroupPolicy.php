<?php

namespace App\Policies;

use App\Models\Group;
use App\Models\User;

class GroupPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if ($user->hasPermission('groups-read')) return true;

        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Group $group): bool
    {
        if ($user->hasPermission('groups-read') AND $group->members->some(fn (User $member) => $member->id === $user->id)) return true;

        if ($user->hasPermission('groups-read-private')) return true;

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->hasPermission('groups-create')) return true;

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Group $group): bool
    {
        if ($user->hasPermission('groups-update')) return true;

        return false;
    }

    public function addMember(User $user, Group $group): bool
    {
        if ($user->hasPermission('groups-create')) return true;

        return false;
    }

    public function removeMember(User $user, Group $group): bool
    {
        if ($user->hasPermission('groups-create')) return true;

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Group $group): bool
    {
        if ($user->hasPermission('groups-delete')) return true;

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Group $group): bool
    {
        if ($user->hasPermission('groups-delete')) return true;

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Group $group): bool
    {
        if ($user->hasPermission('groups-delete')) return true;

        return false;
    }
}
