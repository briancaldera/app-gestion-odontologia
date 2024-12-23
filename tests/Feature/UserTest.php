<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function PHPUnit\Framework\assertArrayHasKey;
use function PHPUnit\Framework\assertArrayNotHasKey;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('factory esta funcionando', function () {
    expect(User::factory()->create())->not()->toThrow(Exception::class);
});

test('usuario tiene UUID', function () {
    $user = User::factory()->create();

    expect($user->id)->toBeUuid();
});

test('usuario tiene nombre de usuario', function () {
    $user = User::factory()->create();

    expect($user->name)->toBeString();
});

test('usuario tiene correo electronico', function () {
    $user = User::factory()->create();

    expect($user->email)->toBeString()->toContain('@');
});

test('has timestamps', function () {
    $user = User::factory()->create();

    assertArrayHasKey('created_at', $user);
    assertArrayHasKey('updated_at', $user);
});

test('la contrasena no se envia al frontend', function () {
    $user = User::factory()->create();

    $serialized = $user->attributesToArray();
    assertArrayNotHasKey('password', $serialized);
});
