<?php

namespace App\Policies;

use App\Models\Cirugia\HistoriaCirugia;
use App\Models\User;

class HistoriaCirugiaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        if ($user->hasPermission('historias-cirugia-read')) return true;

        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, HistoriaCirugia $historiaCirugia): bool
    {
        if ($user->hasPermission('historias-cirugia-read') AND $user->id === $historiaCirugia->autor_id) return true;

        if ($user->hasPermission('historias-cirugia-read-private')) return true;

        if ($user->hasPermission('homeworks-create-corrections')) {
            $groups = $user->groups()->where('owner_id', $user->id)->load('assignments.homeworks');
            $isAHomework = true;

//            $homeworks = Homework::query()->whereJsonContains('documents', $historiaCirugia->id);

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
        if ($user->hasPermission('historias-cirugia-create')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, HistoriaCirugia $historiaCirugia): bool
    {
        if ($user->hasPermission('historias-cirugia-update') AND $user->id === $historiaCirugia->autor_id) return true;

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, HistoriaCirugia $historiaCirugia): bool
    {
        if ($user->hasPermission('historias-cirugia-delete')) return true;

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, HistoriaCirugia $historiaCirugia): bool
    {
        if ($user->hasPermission('historias-cirugia-delete')) return true;

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, HistoriaCirugia $historiaCirugia): bool
    {
        if ($user->hasPermission('historias-cirugia-delete')) return true;

        return false;
    }
}
