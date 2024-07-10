<?php

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

    expect($historiaOdontologica)->toBeInstanceOf(HistoriaOdontologica::class);
});

test('habitos is json', function () {
    $historia = Historia::factory()->forPaciente()->create();
    $historiaOdontologica = HistoriaOdontologica::factory()->for($historia)->create();

    expect($historiaOdontologica->habitos)->toBeObject();
});

test('plan tratamiento is an array', function () {
    $historia = Historia::factory()->forPaciente()->create();
    $historiaOdontologica = HistoriaOdontologica::factory()->for($historia)->create();

    expect($historiaOdontologica->plan_tratamiento)->toBeObject()
        ->and($historiaOdontologica->plan_tratamiento->plan)->toBeArray();
});

test('modificaciones plan tratamiento is an array', function () {
    $historia = Historia::factory()->forPaciente()->create();
    $historiaOdontologica = HistoriaOdontologica::factory()->for($historia)->create();

    expect($historiaOdontologica->modificaciones_plan_tratamiento)->toBeObject()
        ->and($historiaOdontologica->modificaciones_plan_tratamiento->modificaciones)->toBeArray();
});

test('secuencia tratamiento is an array', function () {
    $historia = Historia::factory()->forPaciente()->create();
    $historiaOdontologica = HistoriaOdontologica::factory()->for($historia)->create();

    expect($historiaOdontologica->secuencia_tratamiento)->toBeObject()
        ->and($historiaOdontologica->secuencia_tratamiento->secuencia)->toBeArray();
});
