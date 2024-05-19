<?php

use App\Models\AntPersonales;
use App\Models\Paciente;
use App\Models\Trastornos;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('antPersonales factory can be used', function () {
    $paciente = Paciente::factory()->hasAntPersonales()->create();

    expect($paciente->antPersonales)->toBeInstanceOf(AntPersonales::class);
});

test('trastornos factory can be used', function () {

    $paciente = Paciente::factory()->has(AntPersonales::factory()->has(Trastornos::factory()))->create();

    expect($paciente->antPersonales->trastornos)->toBeInstanceOf(Trastornos::class);
});
