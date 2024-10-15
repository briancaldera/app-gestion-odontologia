<?php

namespace App\Services;

use App\Models\Endodoncia\HistoriaEndodoncia;
use App\Models\Paciente;
use App\Models\User;

interface HistoriaEndodonciaService
{
    public function addHistoria(Paciente $paciente, User $author): HistoriaEndodoncia;
}
