<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function PHPUnit\Framework\assertArrayHasKey;
use function PHPUnit\Framework\assertArrayNotHasKey;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('factory is working', function () {
    expect(User::factory()->create())->not()->toThrow(Exception::class);
});

test('has UUID', function () {
    $user = User::factory()->create();

    expect($user->id)->toBeUuid();
});

test('has username', function () {
    $user = User::factory()->create();

    expect($user->name)->toBeString();
});

test('has email', function () {
    $user = User::factory()->create();

    expect($user->email)->toBeString()->toContain('@');
});

test('has timestamps', function () {
    $user = User::factory()->create();

    assertArrayHasKey('created_at', $user);
    assertArrayHasKey('updated_at', $user);
});

test('password is not visible in frontend', function () {
    $user = User::factory()->create();

    $serialized = $user->attributesToArray();
    assertArrayNotHasKey('password', $serialized);
});

test('has role', function () {
    $user = User::factory()->create();

    assertArrayHasKey('role', $user);
    expect($user->role)->toBeNumeric()->toBeBetween(0, 3);
});

test('default role is estudiante', function () {
    $user = User::factory()->create();

    expect($user->role)->toBe(3);
    expect($user->isEstudiante())->toBeTrue();
});
