<?php

use App\Models\Correccion;
use App\Models\Historia;
use App\Models\Paciente;
use App\Services\CorreccionService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('Service can attach Correccion model to Historia', function () {
    $historia = Historia::factory()->for(Paciente::factory())->create();

    $correccionService = $this->app->make(CorreccionService::class);
    $correccionService->crearCorreccion($historia);

    expect($historia->correcciones)->toBeInstanceOf(Correccion::class)->and($historia->correcciones->correcciones)->toBeInstanceOf(\Illuminate\Support\Collection::class)->toBeEmpty();
});

test('Service can add new correccion message to Correccion model in Historia', function () {
    /** @var Historia $historia*/
    $historia = Historia::factory()->for(Paciente::factory())->create();

    $faker = fake('es_VE');

    $correccion = [
        'user' => $faker->uuid(),
        'content' => $faker->text(),
        'datetime' => $faker->dateTime(),
        'seen' => $faker->dateTime(),
    ];

    /** @var CorreccionService $correccionService */
    $correccionService = $this->app->make(CorreccionService::class);
    $correccionService->attachCorreccion($historia);
    $correccionService->addCorreccion($historia, $correccion);


    expect($historia->correcciones->correcciones)->not()->toBeEmpty()->toHaveLength(1)
        ->and($historia->correcciones->correcciones[0])->toBe($correccion);
    dump($historia->correcciones->correcciones[0]);
});
