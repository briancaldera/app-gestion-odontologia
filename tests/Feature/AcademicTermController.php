<?php

use App\Http\Middleware\EnsureUserHasProfile;
use App\Models\AcademicTerm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutMiddleware([EnsureUserHasProfile::class]);
});

test('se puede crear un nuevo periodo académico', function () {
    // Arrange
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    // Act
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);

    // Assert
    $res->assertOk();
    $this->assertDatabaseCount(AcademicTerm::class, 1);
    $this->assertDatabaseHas(AcademicTerm::class, [
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);
});

test('no se puede crear un periodo académico con nombre vacío', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => '',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con código vacío', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => '',
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con fecha de inicio vacía', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '',
        'end_date' => '2025-01-30',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con fecha de fin vacía', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con nombre demasiado largo', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => str_repeat('a', 256),
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con código demasiado largo', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => str_repeat('a', 256),
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con fecha de inicio no válida', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => 'fecha-no-valida',
        'end_date' => '2025-01-30',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con fecha de fin no válida', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => 'fecha-no-valida',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con fecha de inicio posterior a la fecha de fin', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2025-01-30',
        'end_date' => '2024-09-01',
    ]);
    $res->assertStatus(422);
});

test('no se puede crear un periodo académico con fechas de inicio y fin iguales', function () {
    $user = User::factory()->create();
    $endpoint = route('academic-terms.store');
    $res = $this->actingAs($user)->postJson($endpoint, [
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '2024-09-01',
    ]);
    $res->assertStatus(422);
});

test('se puede actualizar un periodo académico', function () {
    // Arrange
    $user = User::factory()->create();

    $academicTerm = new AcademicTerm([
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);
    $academicTerm->save();

    $endpoint = route('academic-terms.update', $academicTerm);
    // Act
    $res = $this->actingAs($user)->patchJson($endpoint, [
        'name' => 'Periodo 2024-2025 Updated',
    ]);

    // Assert
    $res->assertOk();
    $this->assertDatabaseCount(AcademicTerm::class, 1);
    $this->assertDatabaseHas(AcademicTerm::class, [
        'name' => 'Periodo 2024-2025 Updated',
    ]);
});

test('no se puede actualizar un periodo académico con nombre vacío', function () {
    $user = User::factory()->create();

    $academicTerm = new AcademicTerm([
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);
    $academicTerm->save();

    $endpoint = route('academic-terms.update', $academicTerm);
    $res = $this->actingAs($user)->patchJson($endpoint, [
        'name' => '',
    ]);
    $res->assertStatus(422);
});

test('se puede eliminar un periodo académico', function () {
    // Arrange
    $user = User::factory()->create();

    $academicTerm = new AcademicTerm([
        'name' => 'Periodo 2024-2025',
        'code' => '2024II',
        'start_date' => '2024-09-01',
        'end_date' => '2025-01-30',
    ]);
    $academicTerm->save();
    $this->assertDatabaseCount(AcademicTerm::class, 1);

    $endpoint = route('academic-terms.destroy', $academicTerm);
    // Act
    $res = $this->actingAs($user)->deleteJson($endpoint);

    // Assert
    $res->assertOk();
    $this->assertDatabaseCount(AcademicTerm::class, 0);
});
