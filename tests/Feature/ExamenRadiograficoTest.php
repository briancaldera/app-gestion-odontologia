<?php

use App\Models\ExamenRadiografico;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('test we can use factory', function () {
    $historia = Historia::factory()->forPaciente()->create();
    $historiaOdontologica = HistoriaOdontologica::factory()->for($historia)->create();
    $examen_radiografico = ExamenRadiografico::factory()->for($historiaOdontologica)->create();

    expect($examen_radiografico)->toBeInstanceOf(ExamenRadiografico::class);
    expect($examen_radiografico->historiaOdontologica)->toBeInstanceOf(HistoriaOdontologica::class);
    expect($examen_radiografico->interpretacion_panoramica)->toBeJson();
});
