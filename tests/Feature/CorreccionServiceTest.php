<?php

use App\Models\Correccion;
use App\Models\Historia;
use App\Models\Paciente;
use App\Services\CorreccionService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

function generateRandomCorreccion(): array
{
    $faker = fake('es_VE');

    return [
        'id' => Str::ulid()->toString(),
        'user' => $faker->uuid(),
        'content' => $faker->text(),
        'created' => $faker->dateTime(),
        'updated' => null,
        'seen' => $faker->dateTime(),
    ];
}

test('Service can attach Correccion model to Historia', function () {
    /** @var Historia $historia*/
    $historia = Historia::factory()->for(Paciente::factory())->create();

    /** @var CorreccionService $correccionService*/
    $correccionService = $this->app->make(CorreccionService::class);
    $correccionService->attachCorreccion($historia);

    expect($historia->correcciones)->toBeInstanceOf(Correccion::class)->and($historia->correcciones->correcciones)->toBeInstanceOf(\Illuminate\Support\Collection::class)->toBeEmpty();
});

test('Service can add new correccion message to Correccion model in Historia', function () {
    /** @var Historia $historia*/
    $historia = Historia::factory()->for(Paciente::factory())->create();

    $correccion = generateRandomCorreccion();

    /** @var CorreccionService $correccionService */
    $correccionService = $this->app->make(CorreccionService::class);
    $correccionService->attachCorreccion($historia);
    $correccionService->addCorreccion($historia, $correccion);

    expect($historia->correcciones->correcciones)->not()->toBeEmpty()->toHaveLength(1)
        ->and($historia->correcciones->correcciones[0])->toBe($correccion);
});

test('Service can update existing Correccion', function () {
    /** @var Historia $historia*/
    $historia = Historia::factory()->for(Paciente::factory())->create();

    $correccion = generateRandomCorreccion();

    /** @var CorreccionService $correccionService */
    $correccionService = $this->app->make(CorreccionService::class);
    $correccionService->addCorreccion($historia, $correccion);

    $newContent = 'New content';
    $correccionService->updateCorreccion($historia, $correccion['id'], $newContent);

    expect($historia->correcciones->correcciones[0]['content'])->toEqual($newContent);
});
