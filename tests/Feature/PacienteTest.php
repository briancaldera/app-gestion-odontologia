<?php

use App\Models\Paciente;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('paciente factory can be used', function () {
    $paciente = Paciente::factory()->create();
    expect($paciente)->toBeInstanceOf(Paciente::class);
});

test('paciente can be created', function () {
    $paciente = Paciente::factory()->create();

    $this->assertDatabaseCount('pacientes', 1);
    $this->assertDatabaseHas('pacientes', $paciente->attributesToArray());
});
