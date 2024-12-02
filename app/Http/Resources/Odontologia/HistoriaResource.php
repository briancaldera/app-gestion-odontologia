<?php

namespace App\Http\Resources\Odontologia;

use App\Http\Resources\PacienteResource;
use App\Http\Resources\UserResource;
use App\Models\Group;
use App\Models\Group\Assignment;
use App\Models\User;
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
        /** @var User $user */
        $user = $request->user();

        $isRelatedThroughGroup = $user->hasPermission('homeworks-create-corrections') && $user->groups()->
        some(fn(Group $group) => $group->assignments->
        some(fn(Assignment $assignment) => $assignment->homeworks->
        some(fn(Group\Homework $homework) => $homework->documents->
        some(fn (array $document)  => $document['id'] === $this->id))));

        $canReadPrivate = $user->hasPermission('historias-read-private') || $user->hasPermission('historias-full-control') || $user->hasPermission('homeworks-create-corrections') || $this->autor_id === $user->id;

        return [
            'id' => $this->id,
            'paciente_id' => $this->paciente_id,
            $this->mergeWhen($canReadPrivate || $isRelatedThroughGroup, [
                'status' => $this->status,
                'autor_id' => $this->autor_id,
                'numero' => $this->numero,
                'semestre' => $this->semestre,
                'motivo_consulta' => $this->motivo_consulta,
                'enfermedad_actual' => $this->enfermedad_actual,
                'autor' => new UserResource($this->whenLoaded('autor')),
                'paciente' => new PacienteResource($this->whenLoaded('paciente')),
                'ant_familiares' => $this->whenLoaded('antFamiliares'),
                'ant_personales' => $this->whenLoaded('antPersonales'),
                'trastornos' => $this->whenLoaded('trastornos'),
                'historia_odontologica' => $this->whenLoaded('historiaOdontologica'),
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ]),
        ];
    }
}
