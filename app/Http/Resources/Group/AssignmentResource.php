<?php

namespace App\Http\Resources\Group;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();
        /** @var Group $group */
        $group = $this->group;

        $canReadPrivate = $user->hasPermission('groups-read-private') || $user->id === $this->group->owner_id;
        $homeworkTurnedInByUser = $this->homework->filter(fn ($homework) => $homework->user_id === $user->id);
        $userIsMember = $group->members->some(fn (User $member) => $member->id === $user->id);

            return [
                'id' => $this->id,
                'group_id' => $this->group_id,
                'name' => $this->when($userIsMember || $canReadPrivate, $this->name),
                'description' => $this->when($userIsMember || $canReadPrivate, $this->description),
                'homework' => $this->when($canReadPrivate || $homeworkTurnedInByUser->count() > 0, function () use ($canReadPrivate, $homeworkTurnedInByUser) {
                    if ($canReadPrivate) return $this->homework;
                    return $homeworkTurnedInByUser;
                }),
            ];
    }
}
