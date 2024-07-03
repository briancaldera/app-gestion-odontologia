<?php

use App\Services\HistoriaService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('test we can create patient', function () {
    $historiaService = $this->spy(HistoriaService::class, fn() => \App\Services\HistoriaServiceImpl::class);

    $fakePaciente = \App\Models\Paciente::factory()->make();

    $paciente = $historiaService->addPaciente($fakePaciente->attributesToArray());

    $this->assertDatabaseHas('pacientes', [$paciente]);
})->todo();
