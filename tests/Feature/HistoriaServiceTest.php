<?php

use App\Models\AntFamiliares;
use App\Models\AntPersonales;
use App\Models\Historia;
use App\Models\HistoriaOdontologica;
use App\Models\Paciente;
use App\Models\Trastornos;
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

test('ENDPOINT: historias.storeAntFamiliares is storing Antecedentes Familiares', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $historia = Historia::factory()->forPaciente()->create();

    $this->assertDatabaseCount(Historia::class, 1);

    $antFamiliares = AntFamiliares::factory()->makeOne();
    $antFamiliares->historia_id = $historia->id;

    $res = $this->withoutExceptionHandling()->postJson(
        route('historias.storeAntFamiliares', ['historia' => $historia->id]),
        $antFamiliares->attributesToArray());

    $res->assertCreated();
});

test('ENDPOINT: historias.storeAntFamiliares can save empty field in Antecedentes Familiares', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $historia = Historia::factory()->forPaciente()->create();

    $this->assertDatabaseCount(Historia::class, 1);

    $antFamiliares = AntFamiliares::factory()->makeOne([
        'madre' => '',
        'padre' => '',
    ]);
    $antFamiliares->historia_id = $historia->id;

    $res = $this->withoutExceptionHandling()->postJson(
        route('historias.storeAntFamiliares', ['historia' => $historia->id]),
        $antFamiliares->attributesToArray());

    $res->assertCreated();
    $this->assertDatabaseCount(AntFamiliares::class, 1);
    $this->assertDatabaseHas(AntFamiliares::class, [
       'padre' => null,
       'madre' => null,
    ]);
});

test('ENDPOINT: historias.updateAntFamiliares can set empty a field in Antecedentes Familiares', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $historia = Historia::factory()->forPaciente()->hasAntFamiliares()->create();

    $this->assertDatabaseCount(Historia::class, 1);
    $this->assertDatabaseCount(AntFamiliares::class, 1);

    $antFamiliares = AntFamiliares::factory()->makeOne();
    $antFamiliares->historia_id = $historia->id;
    // Setting empty the parent field
    $antFamiliares->padre = '';

    $res = $this->withoutExceptionHandling()->patchJson(
        route('historias.updateAntFamiliares', ['historia' => $historia->id]),
        [
            'historia_id' => $historia->id,
            'padre' => '',
        ]);

    $res->assertNoContent();
    $this->assertDatabaseHas(AntFamiliares::class, ['padre' => null]);
});

test('ENDPOINT: historias.storeAntPersonales is storing Antecedentes Personales', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $historia = Historia::factory()->forPaciente()->create();

    $this->assertDatabaseCount(Historia::class, 1);

    $antFamiliares = AntPersonales::factory()->makeOne();
    $antFamiliares->historia_id = $historia->id;

    $res = $this->withoutExceptionHandling()->postJson(
        route('historias.storeAntPersonales', ['historia' => $historia->id]),
        $antFamiliares->attributesToArray());

    $res->assertCreated();
});

test('ENDPOINT: historias.updateAntPersonales is updating Antecedentes Personales', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $historia = Historia::factory()->forPaciente()->hasAntPersonales()->create();

    $this->assertDatabaseCount(AntPersonales::class, 1);

    $antFamiliares = AntPersonales::factory()->makeOne();
    $antFamiliares->medicamentos['otros']['descripcion'] = 'Otros medicamentos no prescritos';
    expect($antFamiliares->medicamentos)->toBeObject();
    $antFamiliares->historia_id = $historia->id;

    $res = $this->withoutExceptionHandling()->patchJson(
        route('historias.updateAntPersonales', ['historia' => $historia->id]),
        $antFamiliares->attributesToArray());

    $res->assertNoContent();
    $this->assertDatabaseHas(AntPersonales::class, [
       'medicamentos->otros->descripcion' => $antFamiliares->medicamentos['otros']['descripcion']
    ]);
});

test('ENDPOINT: historias.storeTrastornos can store Trastornos', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $historia = Historia::factory()->forPaciente()->create();

    $this->assertDatabaseCount(Historia::class, 1);

    $trastornos = Trastornos::factory()->makeOne();
    $trastornos->historia_id = $historia->id;

    $res = $this->withoutExceptionHandling()->postJson(
        route('historias.storeTrastornos', ['historia' => $historia->id]),
        $trastornos->attributesToArray());

    $res->assertCreated();
    $this->assertDatabaseCount(Trastornos::class, 1);
    $this->assertModelExists($trastornos);
    $this->assertDatabaseHas(Trastornos::class, [
        'cardiovasculares->disnea' => $trastornos->cardiovasculares['disnea'],
    ]);
});
