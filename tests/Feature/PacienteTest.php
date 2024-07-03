<?php

use App\Models\Paciente;
use App\Models\User;
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

test('paciente service can store paciente', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $paciente = Paciente::factory()->make();

    $res = $this->postJson(route('pacientes.store'), $paciente->attributesToArray());

    expect($res)->assertCreated();
    $this->assertDatabaseCount('pacientes', 1);
    $this->assertDatabaseHas('pacientes', ['nombre' => $paciente->nombre]);
});
