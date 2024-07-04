<?php

namespace App\Services;

use App\Models\Paciente;

interface PacienteService
{
    public function storePaciente(array $data): Paciente;
    public function updatePaciente(Paciente $paciente, array $data): Paciente;
}
