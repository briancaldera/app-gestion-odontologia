<?php

namespace App\Services\Impl;

use App\Models\Paciente;
use App\Models\User;
use App\Services\PacienteService;

class PacienteServiceImpl implements PacienteService
{
    public function storePaciente(array $data): Paciente
    {
        /** @var User $user */
        $user = auth()->user();
        $data = (object) $data;

        $newPaciente = new Paciente();
        $newPaciente->cedula = $data->cedula;
        $newPaciente->nombre = $data->nombre;
        $newPaciente->apellido = $data->apellido;
        $newPaciente->edad = $data->edad;
        $newPaciente->sexo = $data->sexo;
        $newPaciente->peso = $data->peso;
        $newPaciente->fecha_nacimiento = $data->fecha_nacimiento;
        $newPaciente->ocupacion = $data->ocupacion;
        $newPaciente->direccion = $data->direccion;
        $newPaciente->telefono = $data->telefono;
        $newPaciente->motivo_consulta = $data->motivo_consulta;
        $newPaciente->enfermedad_actual = $data->enfermedad_actual;
        $newPaciente->informacion_emergencia = $data->informacion_emergencia;
        $newPaciente->registered_by = $user->id;
        $newPaciente->assigned_to = $user->id;

        $newPaciente->save();

        if (isset($data->foto)) {
            $newPaciente->addMedia($data->foto)->toMediaCollection('foto');
        }

        return $newPaciente;
    }

    public function updatePaciente(Paciente $paciente, $data): Paciente
    {
        $data = (object) $data;

        $paciente->nombre = $data->nombre;
        $paciente->apellido = $data->apellido;
        $paciente->edad = $data->edad;
        $paciente->sexo = $data->sexo;
        $paciente->peso = $data->peso;
        $paciente->fecha_nacimiento = $data->fecha_nacimiento;
        $paciente->ocupacion = $data->ocupacion;
        $paciente->direccion = $data->direccion;
        $paciente->telefono = $data->telefono;
        $paciente->motivo_consulta = $data->motivo_consulta;
        $paciente->enfermedad_actual = $data->enfermedad_actual;

        $paciente->update();

        if (isset($data->foto)) {
            $paciente->addMedia($data->foto)->toMediaCollection('foto');
        }

        return $paciente;
    }

    public function reassignPaciente(Paciente $paciente, string $user_id): bool
    {
        $paciente->assigned_to = $user_id;

        return $paciente->update();
    }
}
