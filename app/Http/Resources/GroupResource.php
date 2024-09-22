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
            'owner' => $this->owner_id,
            'name' => $this->name,
            'members' => $this->when($user->hasPermission('groups-list-users'), $this->members),
            $this->mergeWhen($user->hasPermission('groups-read-private-info'), [
                'updated_at' => $this->updated_at,
                'created_at' => $this->created_at
            ]),
        ];
    }
}
