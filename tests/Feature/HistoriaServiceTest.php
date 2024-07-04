<?php

use App\Models\Historia;
use App\Models\Paciente;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('test we can create patient', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $paciente = Paciente::factory()->create();

    $historia = Historia::factory()->makeOne();
    $historia->paciente_id = $paciente->id;

    $res = $this->withoutExceptionHandling()->postJson(
        route('historia.store', ['paciente' => $paciente->id]),
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
