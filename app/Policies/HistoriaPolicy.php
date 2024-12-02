<?php

namespace App\Policies;

use App\Models\Group;
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
        if ($user->hasPermission('historias-read')) return true;

        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Historia $historia): bool
    {
        if ($user->hasPermission('historias-read') AND $user->id === $historia->autor_id) return true;

        if ($user->hasPermission('historias-read-private')) return true;

        if ($user->hasPermission('homeworks-create-corrections')) {
            $groups = $user->groups()->where('owner_id', $user->id)->load('assignments.homeworks');
            $isAHomework = true;
//            $isAHomework = $groups
//                ->some(fn(Group $group) => $group->assignments
//                    ->some(fn (Group\Assignment $assignment) => $assignment->homeworks
//                        ->some(fn( Group\Homework $homework) => $homework->documents
//                            ->some(fn ($document) => $document->id === $historia->id))));
            if ($isAHomework) {
                return true;
            }
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->hasPermission('historias-create')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Historia $historia): bool|Response
    {
        if ($user->hasPermission('historias-update') AND $user->id === $historia->autor_id) return true;

        return false;
    }

    public function assignID(User $user, Historia $historia): bool|Response
    {
        if ($user->hasPermission('historias-assign-id')) return true;

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Historia $historia): bool
    {
        if ($user->hasPermission('historias-delete')) return true;

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Historia $historia): bool
    {
        if ($user->hasPermission('historias-delete')) return true;

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Historia $historia): bool
    {
        if ($user->hasPermission('historias-delete')) return true;

        return false;
    }
}
