<?php

namespace App\Services;

use App\Models\Group;
use App\Models\Group\Assignment;
use App\Models\User;

interface GroupService
{
    public function createGroup(string $name, User $owner): void;
    public function addMember(Group $group, User $user): void;
    public function removeMember(Group $group, User $user): void;
    public function deleteGroup(Group $group): void;
    public function addAssignment(Group $group, array $data): Assignment;
    public function updateAssignment(Assignment $assignment, array $data);
    public function addHomeworkToAssignment(Assignment $assignment, array $data);
    public function addCorrectionsToDocument(Group\Homework $homework, array $data): Group\Homework;
}
