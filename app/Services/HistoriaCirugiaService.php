<?php

namespace App\Services;

use App\Models\Cirugia\HistoriaCirugia;
use App\Models\Paciente;
use App\Models\User;

interface HistoriaCirugiaService
{
    public function createHistoria(Paciente $paciente, User $autor): HistoriaCirugia;
}
