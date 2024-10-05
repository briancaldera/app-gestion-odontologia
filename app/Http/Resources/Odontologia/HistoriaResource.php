<?php

namespace App\Http\Resources\Odontologia;

use App\Http\Resources\PacienteResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoriaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $canReadPrivate = $user->hasPermission('historias-read-private') || $this->autor_id === $user->id;

        return [
            'id' => $this->id,
            'paciente_id' => $this->paciente_id,
            $this->mergeWhen($canReadPrivate, [
                'status' => $this->status,
                'autor_id' => $this->autor_id,
                'numero' => $this->numero,
                'motivo_consulta' => $this->motivo_consulta,
                'enfermedad_actual' => $this->enfermedad_actual,
                'autor' => new UserResource($this->whenLoaded('autor')),
                'paciente' => new PacienteResource($this->whenLoaded('paciente')),
                'ant_familiares' => $this->whenLoaded('antFamiliares'),
                'ant_personales' => $this->whenLoaded('antPersonales'),
                'trastornos' => $this->whenLoaded('trastornos'),
                'historia_odontologica' => $this->whenLoaded('historiaOdontologica'),
            ]),
        ];
    }
}
