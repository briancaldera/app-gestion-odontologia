<?php

namespace App\Services\Impl;

use App\Models\Endodoncia\HistoriaEndodoncia;
use App\Models\Paciente;
use App\Models\User;
use App\Services\HistoriaEndodonciaService;
use App\Status;

class HistoriaEndodonciaServiceImpl implements HistoriaEndodonciaService
{
    public function addHistoria(Paciente $paciente, User $author): HistoriaEndodoncia
    {
        $initial_status = Status::ABIERTA;

        $new_data = [
            'status' => $initial_status,
            'autor_id' => $author->id
        ];

        $historia_endodoncia = $paciente->historiaEndodoncia()->create($new_data);
        $paciente->touch();

        return $historia_endodoncia;
    }
}
