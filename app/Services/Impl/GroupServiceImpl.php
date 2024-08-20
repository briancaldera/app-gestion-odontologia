<?php

namespace App\Services\Impl;

use App\Models\Group;
use App\Models\User;
use App\Services\GroupService;

class GroupServiceImpl implements GroupService
{

    public function createGroup(string $name, User $owner): void
    {
        $attributes = [
          'owner' => $owner->id,
          'name' => $name,
          'members' => [$owner]
        ];
        Group::create($attributes);
    }

    public function addMember(Group $group, User $user): void
    {
        $group->members->add($user);
        $group->save();
    }

    public function removeMember(Group $group, User $user): bool
    {
        if ($user->id === $group->owner) return false;

        $group->members = $group->members->reject(fn (User $member) => $member->id === $user->id);
        $group->save();
        return true;
    }
}
