<?php

use App\Models\Historia;
use App\Models\HistoriaStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('historia factory can be used', function () {
    $historia = Historia::factory()->forPaciente()->create();
    expect($historia)->toBeInstanceOf(Historia::class);
});

test('historia can be created', function () {
    $historia = Historia::factory()->forPaciente()->create();

    $this->assertDatabaseCount('historias', 1);
    $this->assertDatabaseHas('historias', $historia->attributesToArray());
});

test('student can open Historia form', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/historia/create');

    $response->assertOk();
})->todo();

test('guest cannot open Historia form', function () {
    $this->assertGuest();

    $response = $this->get('/historia/create');
    $response->assertUnauthorized();
    $response->assertRedirectToRoute('login');
})->todo();

test('user can save Historia', function () {
    $user = User::factory()->create();


})->todo();

test('wrong Historia is rejected', function () {

})->skip();

test('initial status is abierta', function () {
    $historia = Historia::factory()->forPaciente()->create();

    expect($historia->status)->toBe(HistoriaStatus::ABIERTA);
});
