<?php

namespace App\Services;

use App\Models\AntFamiliares;
use App\Models\AntPersonales;
use App\Models\ExamenRadiografico;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use App\Models\Paciente;
use App\Models\Trastornos;
use App\Models\User;
use App\Status;

interface HistoriaService
{
    public function addPaciente(array $data): Paciente;
    public function updatePaciente(Paciente $paciente, array $data): void;
    public function addHistoria(Paciente $paciente, User $autor): Historia;
    public function updateHistoria(Historia $historia, array $data): Historia;
    public function addAntFamiliares(Historia $historia, array $data): AntFamiliares;
    public function updateAntFamiliares(Historia $historia, array $data): AntFamiliares;
    public function addAntPersonales(Historia $historia, array $data): AntPersonales;
    public function updateAntPersonales(Historia $historia, array $data): AntPersonales;
    public function addTrastornos(Historia $historia, array $data): Trastornos;
    public function updateTrastornos(Trastornos $trastornos, array $data): Trastornos;
    public function addHistoriaOdontologica(Historia $historia, array $data): HistoriaOdontologica;
    public function updateHistoriaOdontologica(Historia $historia, array $data): HistoriaOdontologica;
    public function updateEstudioModelos(Historia $historia, array $data): void;
    public function updatePlanTratamiento(Historia $historia, array $data): void;
    public function updateModificacionesPlanTratamiento(Historia $historia, array $data): void;
    public function approveModificacionTratamiento(Historia $historia, User $user, string $id): void;
    public function updateSecuenciaTratamiento(Historia $historia, array $data): void;
    public function addExamenRadiografico(HistoriaOdontologica $historiaOdon, array $data): ExamenRadiografico;
    public function updateExamenRadiografico(ExamenRadiografico $examenRadio, array $data): ExamenRadiografico;
    public function changeStatus(Historia $historia, Status $status): Historia;
}
