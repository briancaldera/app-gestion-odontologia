<?php

namespace App\Services;

use App\Models\AntFamiliares;
use App\Models\AntPersonales;
use App\Models\ExamenRadiografico;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use App\Models\Paciente;
use App\Models\Trastornos;

interface HistoriaService
{
    public function addPaciente(array $data): Paciente;
    public function addHistoria(Paciente $paciente, array $data): Historia;
    public function addAntFamiliares(Historia $historia, array $data): AntFamiliares;

    public function addAntPersonales(Historia $historia, array $data): AntPersonales;

    public function addTrastornos(Historia $historia, array $data): Trastornos;

    public function addHistoriaOdontologica(Historia $historia, array $data): HistoriaOdontologica;

    public function addExamenRadiografico(HistoriaOdontologica $historiaOdon, array $data): ExamenRadiografico;
}

class HistoriaServiceImpl implements HistoriaService
{

    public function addPaciente(array $data): Paciente
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

    public function addHistoria(Paciente $paciente, array $data): Historia
    {
        $historia = Historia::create([
            'paciente_id' => $paciente->id,
            ...$data,
            ]);

        return $historia;
    }

    public function addAntFamiliares(Historia $historia, array $data): AntFamiliares
    {
        $antFamiliares = AntFamiliares::create([
            'historia_id' => $historia->id,
            ... $data,
        ]);

        return $antFamiliares;
    }


    public function addAntPersonales(Historia $historia, array $data): AntPersonales
    {
        $antPersonales = AntPersonales::create([
            'historia_id' => $historia->id,
            ...$data,
        ]);

        return $antPersonales;
    }

    public function addTrastornos(Historia $historia, array $data): Trastornos
    {
        return Trastornos::create([
            'historia_id' => $historia->id,
            ...$data,
        ]);
    }

    public function addHistoriaOdontologica(Historia $historia, array $data): HistoriaOdontologica
    {
        return HistoriaOdontologica::create([
            'historia_id' => $historia->id,
            ...$data,
        ]);
    }

    public function addExamenRadiografico(HistoriaOdontologica $historiaOdon, array $data): ExamenRadiografico
    {
        return ExamenRadiografico::create([
            'historia_id' => $historiaOdon->historia_id,
            ...$data,
        ]);
    }
}
