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
        $userIsMember = $group->members->some(fn (User $member) => $member->id === $user->id);

            return [
                'id' => $this->id,
                'group_id' => $this->group_id,
                'name' => $this->when($userIsMember || $canReadPrivate, $this->name),
                'description' => $this->when($userIsMember || $canReadPrivate, $this->description),
                'homeworks' => $this->whenLoaded('homeworks', function () use($canReadPrivate, $user) {
                    if ($canReadPrivate) {
                        return $this->homeworks()->with(['user' => ['profile:user_id,nombres,apellidos']])->get();
                    } else {
                        return $this->homeworks()->where('user_id', $user->id)->get();
                    }
                }),
            ];
    }
}
