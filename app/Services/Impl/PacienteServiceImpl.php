<?php

namespace App\Services\Impl;

use App\Models\Paciente;
use App\Models\User;
use App\Services\PacienteService;
use Illuminate\Http\UploadedFile;

class PacienteServiceImpl implements PacienteService
{
    const PACIENTE_PHOTO_DIR = 'pacientes/photos/';

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

        $paciente->cedula = $data->cedula;
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

        $paciente->save();

        if (isset($data->foto)) {
            $paciente->addMedia($data->foto)->toMediaCollection('foto');
        }

        return $paciente;
    }

    private function savePhotoToFilesystem(UploadedFile $file): string
    {
        $now = now();
        return $file->store(self::PACIENTE_PHOTO_DIR . $now->year . '/'. $now->month);
    }
}
