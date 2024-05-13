<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('student can open Historia form', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/historia/create');

    $response->assertOk();
});

test('guest cannot open Historia form', function () {
    $this->assertGuest();

    $response = $this->get('/historia/create');
    $response->assertUnauthorized();
    $response->assertRedirectToRoute('login');
});


test('user can save Historia', function () {
    $user = User::factory()->create();


})->skip('Todo');
