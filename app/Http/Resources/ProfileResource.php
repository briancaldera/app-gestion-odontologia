<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id' => $this->user_id,
            'nombres' => $this->nombres,
            'apellidos' => $this->apellidos,
            'picture_url' => $this->picture_url,
            $this->mergeWhen($request->user()->hasPermission('users-read-private') || $this->user_id === $request->user()->id, [
                'fecha_nacimiento' => $this->fecha_nacimiento,
                'telefono' => $this->telefono,
                'direccion' => $this->direccion,
                'sexo' => $this->sexo,
                'cedula' => $this->cedula,
            ]),
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
