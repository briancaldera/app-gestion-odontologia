<?php

namespace App\Http\Resources\Odontologia\Endodoncia;

use App\Models\Group;
use App\Models\Group\Assignment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoriaEndodonciaResource extends JsonResource
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
            some(fn(array $document) => $document['id'] === $this->id))));

        $canReadPrivate = $user->hasPermission('historias-read-private') || $this->autor_id === $user->id;

        return [
            'id' => $this->id,
            'paciente_id' => $this->paciente_id,
            $this->mergeWhen($canReadPrivate || $isRelatedThroughGroup, [
                'status' => $this->status,
                'autor_id' => $this->autor_id,
                'numero' => $this->numero,
                'anamnesis' => $this->anamnesis,
                'evaluacion_dolor' => $this->evaluacion_dolor,
                'secuencia_tratamiento' => $this->secuencia_tratamiento,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ]),
        ];
    }
}
