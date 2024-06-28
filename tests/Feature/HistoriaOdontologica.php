<?php

use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('test we can use factory', function () {
    $historia = Historia::factory()->create();
    $historiaOdontologica = HistoriaOdontologica::factory()->for($historia)->create();

    expect($historiaOdontologica)->toBeInstanceOf(HistoriaOdontologica::class);
});

test('habitos is json', function () {
    $historia = Historia::factory()->create();
    $historiaOdontologica = HistoriaOdontologica::factory()->for($historia)->create();

    expect($historiaOdontologica->habitos)->toBeJson();
});
