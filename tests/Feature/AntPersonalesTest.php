<?php

use App\Models\AntPersonales;
use App\Models\Historia;
use App\Models\Trastornos;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('antPersonales factory can be used', function () {
    $historia = Historia::factory()->forPaciente()->hasAntPersonales()->create();

    expect($historia->antPersonales)->toBeInstanceOf(AntPersonales::class);
});

test('trastornos factory can be used', function () {

    $historia = Historia::factory()->forPaciente()->has(AntPersonales::factory())->has(Trastornos::factory())->create();

    expect($historia->trastornos)->toBeInstanceOf(Trastornos::class);
});

test('medicamentos can be attached to antPersonales', function () {
    $historia = Historia::factory()->forPaciente()->hasAntPersonales()->create();
    $medicamentos = $historia->antPersonales->medicamentos;

    expect($medicamentos)->toBeObject();
});

test('alergias can be attached to antPersonales', function () {
    $historia = Historia::factory()->forPaciente()->hasAntPersonales()->create();
    $alergias = $historia->antPersonales->alergias;

    expect($alergias)->toBeObject();
});
