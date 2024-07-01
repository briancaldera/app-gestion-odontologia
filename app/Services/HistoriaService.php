<?php

namespace App\Services;

use App\Models\Historia;
use App\Models\Paciente;

interface HistoriaService
{
    public function createHistoria(string $pacienteId): Historia;

    public function createPaciente(array $data): Paciente;
}

class HistoriaServiceImpl implements HistoriaService
{

    public function createPaciente(array $data): Paciente
    {

        $paciente = Paciente::create([
            'cedula' => $data['cedula'],
            'nombre' => $data['nombre'],
            'apellido' => $data['apellido'],
            'edad' => $data['edad'],
            'sexo' => $data['sexo'],
            'peso' => $data['peso'],
            'fecha_nacimiento' => $data['fecha_nacimiento'],
            'ocupacion' => $data['ocupacion'],
            'direccion' => $data['direccion'],
            'telefono' => $data['telefono'],
            'foto_url' => $data['foto_url'],
        ]);

        return $paciente;
    }

    public function createHistoria(string $pacienteId): Historia
    {

    }
    
}
