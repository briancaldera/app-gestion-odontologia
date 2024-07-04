<?php

use App\Models\Historia;
use App\Models\Paciente;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('ENDPOINT: historias.store is working', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $paciente = Paciente::factory()->create();

    $historia = Historia::factory()->makeOne();
    $historia->paciente_id = $paciente->id;

    $res = $this->withoutExceptionHandling()->postJson(
        route('historias.store', ['paciente' => $paciente->id]),
        $historia->attributesToArray(),
    );

    $res->assertCreated();
    $this->assertDatabaseCount(Paciente::class, 1);
    $this->assertDatabaseHas(Paciente::class, ['id' => $paciente->id]);
    $this->assertDatabaseCount(Historia::class, 1);
    $this->assertDatabaseHas(Historia::class, [
        'paciente_id' => $paciente->id,
        'motivo_consulta' => $historia->motivo_consulta,
    ]);
})->repeat(5);

test('ENDPOINT: historias.update is working', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $historia = Historia::factory()->forPaciente()->create();

    $this->assertDatabaseCount(Historia::class, 1);
    $this->assertDatabaseHas(Historia::class, [
        'motivo_consulta' => $historia->motivo_consulta,
    ]);

    $historiaUpdated = Historia::factory()->makeOne();

    $res = $this->withoutExceptionHandling()->patchJson(
        route('historias.update', ['historia' => $historia->id]),
        $historiaUpdated->attributesToArray());

    $res->assertNoContent();
    $this->assertDatabaseCount(Paciente::class, 1);
    $this->assertDatabaseCount(Historia::class, 1);
    $this->assertDatabaseHas(Historia::class, [
        'motivo_consulta' => $historiaUpdated->motivo_consulta,
    ]);
    $this->assertDatabaseMissing(Historia::class, [
        'motivo_consulta' => $historia->motivo_consulta,
    ]);
})->repeat(5);

test('ENDPOINT: historias.update is updating partially', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $historia = Historia::factory()->forPaciente()->create();

    $this->assertDatabaseCount(Historia::class, 1);
    $this->assertDatabaseHas(Historia::class, [
        'motivo_consulta' => $historia->motivo_consulta,
    ]);

    $historiaUpdated = Historia::factory()->makeOne();

    $res = $this->withoutExceptionHandling()->patchJson(
        route('historias.update', ['historia' => $historia->id]),
        ['motivo_consulta' => $historiaUpdated->motivo_consulta,]);

    $res->assertNoContent();
    $this->assertDatabaseCount(Paciente::class, 1);
    $this->assertDatabaseCount(Historia::class, 1);
    $this->assertDatabaseHas(Historia::class, [
        'motivo_consulta' => $historiaUpdated->motivo_consulta,
        'enfermedad_actual' => $historia->enfermedad_actual,
    ]);
    $this->assertDatabaseMissing(Historia::class, [
        'motivo_consulta' => $historia->motivo_consulta,
        'enfermedad_actual' => $historiaUpdated->enfermedad_actual,
    ]);
})->repeat(3);
