<?php

use App\Models\Correccion;
use App\Models\Historia;
use App\Models\Paciente;
use App\Models\User;
use App\Services\CorreccionService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;
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

    expect($historia->correcciones)->toBeInstanceOf(Correccion::class)->and($historia->correcciones->correcciones)->toBeInstanceOf(Collection::class)->toBeEmpty();
});

test('Service can add new correccion message to Correccion model in Historia', function () {
    $faker = fake('es_VE');

    /** @var Historia $historia*/
    $historia = Historia::factory()->for(Paciente::factory())->create();

    /** @var CorreccionService $correccionService */
    $correccionService = $this->app->make(CorreccionService::class);
    $correccionService->attachCorreccion($historia);

    /** @var User $user*/
    $user = User::factory()->make();
    $randomContent = $faker->text();

    $correccionService->addCorreccion($historia, $user->id, $randomContent);

    expect($historia->correcciones->correcciones)->not()->toBeEmpty()->toHaveLength(1)
        ->and($historia->correcciones->correcciones[0]['content'])->toBe($randomContent);
});

test('Service can update existing Correccion', function () {
    $faker = fake('es_VE');

    /** @var Historia $historia*/
    $historia = Historia::factory()->for(Paciente::factory())->create();

    /** @var CorreccionService $correccionService */
    $correccionService = $this->app->make(CorreccionService::class);

    /** @var User $user*/
    $user = User::factory()->make();
    $randomContent = $faker->text();
    $correccionService->addCorreccion($historia, $user->id, $randomContent);

    expect($historia->correcciones->correcciones[0]['content'])->toEqual($randomContent);

    $correccion = $historia->correcciones->correcciones[0];

    $newContent = 'New content';
    $correccionService->updateCorreccion($historia, $correccion['id'], $newContent);

    expect($historia->correcciones->correcciones[0]['content'])->toEqual($newContent);
});

test('Service can delete Correccion', function () {
    $faker = fake('es_VE');

    /** @var Historia $historia*/
    $historia = Historia::factory()->for(Paciente::factory())->create();

    /** @var CorreccionService $correccionService */
    $correccionService = $this->app->make(CorreccionService::class);

    /** @var User $user*/
    $user = User::factory()->make();
    $randomContent = $faker->text();
    $correccionService->addCorreccion($historia, $user->id, $randomContent);

    expect($historia->correcciones->correcciones)->toHaveLength(1);

    $correccion = $historia->correcciones->correcciones[0];

    $correccionService->deleteCorreccion($historia, $correccion['id']);

    expect($historia->correcciones->correcciones)->toHaveLength(0);
});
