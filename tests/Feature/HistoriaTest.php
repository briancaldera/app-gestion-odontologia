<?php

use App\Models\Historia;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

const TABLE_NAME = 'historias';

test('historia factory can be used', function () {
    $historia = Historia::factory()->create();

    expect($historia)->toBeInstanceOf(Historia::class);
});

test('historia can be created', function () {
    $historia = Historia::factory()->create();

    $this->assertDatabaseCount(TABLE_NAME, 1);
    $this->assertDatabaseHas(TABLE_NAME, $historia->attributesToArray());
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

test('wrong Historia is rejected', function () {

})->skip();

