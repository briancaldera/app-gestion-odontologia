<?php

use App\Models\AntFamiliares;
use App\Models\Paciente;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('AntFamiliares factory can be used', function () {
    $paciente = Paciente::factory()->hasAntFamiliares()->create();

    expect($paciente->antFamiliares)->toBeInstanceOf(AntFamiliares::class);
});

test('AntFamiliares can be created', function () {
    $paciente = Paciente::factory()->hasAntFamiliares()->create();

    $this->assertDatabaseCount('ant_familiares', 1);
    $this->assertDatabaseHas('ant_familiares', $paciente->antFamiliares->attributesToArray());
});
