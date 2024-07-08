<?php

namespace App\Services\Impl;

use App\Models\AntFamiliares;
use App\Models\AntPersonales;
use App\Models\ExamenRadiografico;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use App\Models\Paciente;
use App\Models\Trastornos;
use App\Services\HistoriaService;
use Illuminate\Support\Arr;

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
        return $paciente->historia()->create($data);
    }

    public function updateHistoria(Historia $historia, array $data): Historia
    {
        $historia->updateOrFail($data);
        return $historia;
    }

    public function addAntFamiliares(Historia $historia, array $data): AntFamiliares
    {
        return $historia->antFamiliares()->create($data);
    }

    public function updateAntFamiliares(AntFamiliares $antFamiliares, array $data): AntFamiliares
    {
        $antFamiliares->updateOrFail($data);
        return $antFamiliares;
    }


    public function addAntPersonales(Historia $historia, array $data): AntPersonales
    {
        return $historia->antPersonales()->create($data);
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

