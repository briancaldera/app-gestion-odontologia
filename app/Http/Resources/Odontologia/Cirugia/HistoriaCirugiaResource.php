<?php

namespace App\Http\Resources\Odontologia\Cirugia;

use App\Models\Group;
use App\Models\Group\Assignment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistoriaCirugiaResource extends JsonResource
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
                'autor_id' => $this->autor_id,
                'status' => $this->status,
                'anamnesis' => $this->anamnesis,
                'habitos' => $this->habitos,
                'femenino' => $this->femenino,
                'antecedentes' => $this->antecedentes,
                'examen_fisico' => $this->examen_fisico,
                'observaciones' => $this->observaciones,
                'estudios_radiograficos' => $this->estudios_radiograficos,
                'secuencia_tratamiento' => $this->secuencia_tratamiento,
            ]),
        ];
    }
}
