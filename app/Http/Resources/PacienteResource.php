<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PacienteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $canReadPrivate = $user->hasPermission('pacientes-read-private-info') || $this->assigned_to === $user->id;

        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellido' => $this->apellido,
            $this->mergeWhen($canReadPrivate, [
                'cedula' => $this->cedula,
                'edad' => $this->edad,
                'sexo' => $this->sexo,
                'peso' => $this->peso,
                'fecha_nacimiento' => $this->fecha_nacimiento,
                'ocupacion' => $this->ocupacion,
                'direccion' => $this->direccion,
                'telefono' => $this->telefono,
                'motivo_consulta' => $this->motivo_consulta,
                'enfermedad_actual' => $this->enfermedad_actual,
                'foto' => $this->foto,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
                'registered_by' => $this->registered_by,
                'assigned_to' => $this->assigned_to,
                'medico_tratante' => new UserResource($this->whenLoaded('medicoTratante')),
            ]),
        ];
    }
}
