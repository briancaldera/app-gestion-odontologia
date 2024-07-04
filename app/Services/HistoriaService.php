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
    public function updateHistoria(Historia $historia, array $data): Historia;
    public function addAntFamiliares(Historia $historia, array $data): AntFamiliares;
    public function addAntPersonales(Historia $historia, array $data): AntPersonales;
    public function addTrastornos(Historia $historia, array $data): Trastornos;
    public function addHistoriaOdontologica(Historia $historia, array $data): HistoriaOdontologica;
    public function addExamenRadiografico(HistoriaOdontologica $historiaOdon, array $data): ExamenRadiografico;
}
