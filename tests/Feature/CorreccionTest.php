<?php

use App\Http\Middleware\EnsureUserHasProfile;
use App\Models\Correccion;
use App\Models\Historia;
use App\Models\Paciente;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Str;

beforeAll(function () {
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
});

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
    $this->withoutMiddleware([EnsureUserHasProfile::class]);
});

test('Profesor can add Correccion ', function () {
    // Arrange
    $faker = fake('es_VE');

    /* @var Historia $historia */
    $historia = Historia::factory()->for(Paciente::factory())->createOne();

    /* @var User $user */
    $user = User::factory()->createOne(['role' => 2]);

    // Act
    $response = $this->actingAs($user)->postJson(route('historias.correcciones.store', ['historia' => $historia->id,]),
        [
            'historia_id' => $historia->id,
            'message' => $faker->text(),
        ]
    );
    $historia->refresh();

    // Assert
    $response->assertCreated();
    $this->assertDatabaseCount(Correccion::class, 1);
    $this->assertModelExists($historia->correcciones);
    expect($historia->correcciones->correcciones)->toHaveLength(1);
});

test('Profesor can edit Correccion', function () {
    // Arrange
   $faker = fake('es_VE');

    /* @var Historia $historia */
    $historia = Historia::factory()->for(Paciente::factory())->createOne();

    $correccion = generateRandomCorreccion();

    $historia->correcciones->correcciones->add($correccion);
    $historia->correcciones->save();

    /* @var User $user */
    $user = User::factory()->createOne(['role' => 2]);

    $randomContent = $faker->text();

    // Act
    $response = $this->actingAs($user)->patchJson(route('historias.correcciones.update', ['historia' => $historia->id, 'correccion' => $correccion['id']]),
    [
        'historia_id' => $historia->id,
        'correccion_id' => $correccion['id'],
        'message' => $randomContent,
    ]);
    $historia->refresh();

    // Assert
    $response->assertOk();
    expect($historia->correcciones->correcciones)->toHaveLength(1)->and($historia->correcciones->correcciones->firstWhere('id', '=', $correccion['id']))->not()->toBeNull()
        ->and($historia->correcciones->correcciones->firstWhere('id', '=', $correccion['id'])['content'])->toEqual($randomContent);
});

test('Profesor can delete Correccion', function () {
    // Arrange
    $faker = fake('es_VE');

    /* @var Historia $historia */
    $historia = Historia::factory()->for(Paciente::factory())->createOne();

    $correccion = generateRandomCorreccion();

    $historia->correcciones->correcciones->add($correccion);
    $historia->correcciones->save();

    expect($historia->correcciones->correcciones)->toHaveLength(1);

    /* @var User $user */
    $user = User::factory()->createOne(['role' => 2]);

    // Act
    $response = $this->actingAs($user)->deleteJson(route('historias.correcciones.destroy', ['historia' => $historia->id, 'correccion' => $correccion['id']]),
        [
            'historia_id' => $historia->id,
            'correccion_id' => $correccion['id'],
        ]);
    $historia->refresh();

    // Assert
    $response->assertOk();
    expect($historia->correcciones->correcciones)->toHaveLength(0);
});
