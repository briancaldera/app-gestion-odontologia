<?php

namespace App\Services\Impl;

use App\Models\AntFamiliares;
use App\Models\AntPersonales;
use App\Models\ExamenRadiografico;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use App\Models\Paciente;
use App\Models\Trastornos;
use App\Models\User;
use App\Services\HistoriaService;
use App\Status;
use Illuminate\Http\UploadedFile;

class HistoriaServiceImpl implements HistoriaService
{
    const PACIENTE_PHOTO_DIR = 'pacientes/fotos/';
    const HISTORIA_DIR = 'historias/';

    public function addPaciente(array $data): Paciente
    {

        if (isset($data['foto'])) {
            $foto_url = $this->savePhotoToFilesystem($data['foto']);
        }

        return Paciente::create([
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
            'foto_url' => $foto_url ?? null,
        ]);
    }

    public function updatePaciente(Paciente $paciente, array $data): void
    {
        if (isset($data['foto'])) {
            $foto_url = $this->savePhotoToFilesystem($data['foto']);
        }

        $paciente->updateOrFail([
            'nombre' => $data['nombre'],
            'apellido' => $data['apellido'],
            'edad' => $data['edad'],
            'sexo' => $data['sexo'],
            'peso' => $data['peso'],
            'fecha_nacimiento' => $data['fecha_nacimiento'],
            'ocupacion' => $data['ocupacion'],
            'direccion' => $data['direccion'],
            'telefono' => $data['telefono'],
            'foto_url' => $foto_url ?? null,
        ]);
    }


    public function addHistoria(Paciente $paciente, User $autor): Historia
    {
        $initial_status = Status::ABIERTA;
        $new_data = [
            'status' => $initial_status,
            'autor_id' => $autor->id
        ];

        /* @var Historia $historia */
        $historia =  $paciente->historia()->create($new_data);
        $historia->antFamiliares()->create();
        $historia->antPersonales()->create();
        $historia->trastornos()->create();
        /* @var HistoriaOdontologica $historia_odon */
        $historia->historiaOdontologica()->create();
        return $historia;
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

    public function updateAntFamiliares(Historia $historia, array $data): AntFamiliares
    {
        $antFamiliares = $historia->antFamiliares()->updateOrCreate(['historia_id' => $historia->id] ,$data);
        return $antFamiliares;
    }


    public function addAntPersonales(Historia $historia, array $data): AntPersonales
    {
        return $historia->antPersonales()->create($data);
    }

    public function updateAntPersonales(Historia $historia, array $data): AntPersonales
    {
        $antPersonales = $historia->antPersonales()->updateOrCreate(['historia_id' => $historia->id], $data);
        $trastornos_data = $data['trastornos'];
        $trastornos = $historia->trastornos()->updateOrCreate(['historia_id' => $historia->id], $trastornos_data);
        return $antPersonales;
    }

    public function addTrastornos(Historia $historia, array $data): Trastornos
    {
        return $historia->trastornos()->create($data);
    }

    public function updateTrastornos(Trastornos $trastornos, array $data): Trastornos
    {
        $trastornos->updateOrFail($data);
        return $trastornos;
    }

    public function addHistoriaOdontologica(Historia $historia, array $data): HistoriaOdontologica
    {
        return $historia->historiaOdontologica()->create($data);
    }

    public function updateHistoriaOdontologica(Historia $historia, array $data): HistoriaOdontologica
    {
        $historiaOdon = $historia->historiaOdontologica()->updateOrCreate(['historia_id' => $historia->id], $data);
        return $historiaOdon;
    }

    public function updateEstudioModelos(Historia $historia, array $data): void
    {
        $estudio_modelos = $data['estudio_modelos'];
        $historia_odon = $historia->historiaOdontologica()->updateOrCreate(['historia_id' => $historia->id], [
            'estudio_modelos' => $estudio_modelos
        ]);
    }

    public function updatePlanTratamiento(Historia $historia, array $data): void
    {
        $plan = $data['plan_tratamiento'];
        $historia_odon = $historia->historiaOdontologica()->updateOrCreate(['historia_id' => $historia->id], [
            'plan_tratamiento' => $plan
        ]);
    }

    public function updateModificacionesPlanTratamiento(Historia $historia, array $data): void
    {
        $modificaciones = $data['modificaciones_plan_tratamiento'];
        $historia_odon = $historia->historiaOdontologica()->updateOrCreate(['historia_id' => $historia->id], [
            'modificaciones_plan_tratamiento' => $modificaciones
        ]);
    }

    public function updateSecuenciaTratamiento(Historia $historia, array $data): void
    {
        $secuencia = $data['secuencia_tratamiento'];
        $historia_odon = $historia->historiaOdontologica()->updateOrCreate(['historia_id' => $historia->id], [
            'secuencia_tratamiento' => $secuencia
        ]);
    }


    public function addExamenRadiografico(HistoriaOdontologica $historiaOdon, array $data): ExamenRadiografico
    {
        return $historiaOdon->examenRadiografico()->create($data);
    }

    public function updateExamenRadiografico(ExamenRadiografico $examenRadio, array $data): ExamenRadiografico
    {
        $examenRadio->updateOrFail($data);
        return $examenRadio;
    }

    public function changeStatus(Historia $historia, Status $status): Historia
    {
        $historia->setStatus($status);

        return $historia;
    }

    private function savePhotoToFilesystem(UploadedFile $file): string
    {
        $now = now();
        $folder = normalize_path(self::PACIENTE_PHOTO_DIR . $now->year . '/'. $now->month);
        return $file->store($folder);
    }
}

