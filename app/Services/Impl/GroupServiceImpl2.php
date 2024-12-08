<?php

namespace App\Services\Impl;

use App\Models\Group;
use App\Models\User;
use App\Services\GroupService;

class GroupServiceImpl2 implements GroupService
{
    public function createGroup(string $name, User $owner): void
    {
        // TODO: Implement createGroup() method.
    }

    public function addMember(Group $group, User $user): void
    {
        $group->members = $group->members->push($user->id);
        $group->update();
    }

    public function removeMember(Group $group, User $user): void
    {
        $group->members = $group->members->reject(fn(string $user_id) => $user_id === $user->id);
        $group->update();
    }

    public function deleteGroup(Group $group): void
    {
        // TODO: Implement deleteGroup() method.
    }
}
