<?php

namespace App\Services\Impl;

use App\Models\Cirugia\HistoriaCirugia;
use App\Models\Paciente;
use App\Models\User;
use App\Services\HistoriaCirugiaService;
use App\Status;

class HistoriaCirugiaServiceImpl implements HistoriaCirugiaService
{
    public function createHistoria(Paciente $paciente, User $autor): HistoriaCirugia
    {
        $initial_status = Status::ABIERTA;

        $new_data = [
            'status' => $initial_status,
            'autor_id' => $autor->id
        ];

        if ($paciente->historiaCirugia()->doesntExist()) {
            $historia_cirugia = $paciente->historiaCirugia()->create($new_data);
            $paciente->touch();
        } else {
            $historia_cirugia = $paciente->historiaCirugia;
        }

        return $historia_cirugia;
    }
}
