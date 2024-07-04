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

    $res->assertCreated();
    $this->assertDatabaseCount(Paciente::class, 1);
    $this->assertDatabaseHas(Paciente::class, ['nombre' => $paciente->nombre]);
});

test('paciente service can update paciente', function () {

    $user = User::factory()->create();
    $this->actingAs($user);

    $paciente = Paciente::factory()->create();
    $this->assertDatabaseHas(Paciente::class, ['cedula' => $paciente->cedula]);
    $this->assertDatabaseCount(Paciente::class, 1);

    $updatedPaciente = Paciente::factory()->makeOne();

    $this->assertDatabaseMissing(Paciente::class, ['cedula' => $updatedPaciente->cedula]);

    $res = $this->withoutExceptionHandling()->patchJson(route('pacientes.update', [$paciente->id]), $updatedPaciente->attributesToArray());

    $res->assertNoContent();
    $this->assertDatabaseCount(Paciente::class, 1);
    $this->assertDatabaseHas(Paciente::class, ['cedula' => $updatedPaciente->cedula]);
    $this->assertDatabaseMissing(Paciente::class, ['cedula' => $paciente->cedula]);
})->repeat(10);
