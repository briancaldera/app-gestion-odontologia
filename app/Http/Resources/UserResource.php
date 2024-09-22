<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $canReadPrivate = $user->hasPermission('users-read-private-info') || $this->id === $user->id;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->when($canReadPrivate, $this->email),
            'created_at' => $this->when($canReadPrivate, $this->created_at),
            'updated_at' => $this->when($canReadPrivate, $this->updated_at),
            'email_verified_at' => $this->when($canReadPrivate, $this->email_verified_at),
            'role' => $this->roles[0]->name,
            'permissions' => $this->when($this->id === $user->id, $this->allPermissions()->pluck('name')),
            'profile' => new ProfileResource($this->whenLoaded('profile')),
        ];
    }
}
