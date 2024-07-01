<?php

use App\Models\AntFamiliares;
use App\Models\Paciente;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('AntFamiliares factory can be used', function () {
    $historia = \App\Models\Historia::factory()->forPaciente()->hasAntFamiliares()->create();

    expect($historia->antFamiliares)->toBeInstanceOf(AntFamiliares::class);
});

test('AntFamiliares can be created', function () {
    $historia = \App\Models\Historia::factory()->forPaciente()->hasAntFamiliares()->create();

    $this->assertDatabaseCount('ant_familiares', 1);
    $this->assertDatabaseHas('ant_familiares', $historia->antFamiliares->attributesToArray());
});
