<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();
        return [
            'id' => $this->id,
            'owner' => new UserResource($this->whenLoaded('owner')),
            'name' => $this->name,
            'members' => $this->when($user->hasPermission('groups-index-users'), $this->members->toArray()),
            'assignments' => $this->whenLoaded('assignments'),
            $this->mergeWhen($user->hasPermission('groups-read-private'), [
                'updated_at' => $this->updated_at,
                'created_at' => $this->created_at
            ]),
        ];
    }
}
