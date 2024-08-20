<?php

namespace App\Services;

use App\Models\Group;
use App\Models\User;

interface GroupService
{
    public function createGroup(string $name, User $owner): void;
    public function addMember(Group $group, User $user): void;
    public function removeMember(Group $group, User $user): bool;
}
