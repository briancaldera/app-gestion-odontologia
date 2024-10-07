<?php

namespace App\Services\Impl;

use App\Exceptions\InvalidMemberException;
use App\Exceptions\MemberAlreadyExistsException;
use App\Models\Group;
use App\Models\Group\Assignment;
use App\Models\Group\Homework;
use App\Models\User;
use App\Notifications\UserAddedToGroup;
use App\Services\GroupService;
use Exception;
use Illuminate\Support\Str;

class GroupServiceImpl implements GroupService
{

    public function createGroup(string $name, User $owner): void
    {

        $attributes = [
          'owner_id' => $owner->id,
          'name' => $name,
          'members' => collect([$owner])
        ];

        Group::create($attributes);
    }

    /**
     * @throws MemberAlreadyExistsException
     */
    public function addMember(Group $group, User $user): void
    {
        if ($group->members->contains(fn (User $member) => $member->id === $user->id)) {
            throw new MemberAlreadyExistsException("Member [$user->id] already exists in group [$group->id]");
        }

        $group->members->add($user);
        $group->save();
        $user->notify(new UserAddedToGroup($group));
    }

    public function removeMember(Group $group, User $user): void
    {
        if ($user->id === $group->owner) throw new InvalidMemberException("Tried to remove owner [$group->owner] member from group [$group->id]");

        if (!$group->members->contains(fn (User $member) => $member->id === $user->id)) throw new InvalidMemberException("User [$user->id] is not a member in group [$group->id]");

        $group->members = $group->members->reject(fn (User $member) => $member->id === $user->id);
        $group->save();
    }

    public function addAssignment(Group $group, array $data): Assignment
    {
        $data = (object) $data;

        $assignment = $group->assignments()->create([
            'name' => $data->name,
            'description' => $data->description,
        ]);

        return $assignment;
    }

    public function updateAssignment(Assignment $assignment, array $data)
    {
        $assignment->update($data);

        return $assignment;
    }

    public function addHomeworkToAssignment(Assignment $assignment, array $data)
    {
        $data = (object) $data;
        $user = auth()->user();

        $assignment->homeworks()->create([
            'user_id' => $user->id,
            'documents' => $data->documents,
        ]);
    }

    public function deleteGroup(Group $group): void
    {
        $group->deleteOrFail();
    }
}
