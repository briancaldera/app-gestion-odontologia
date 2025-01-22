<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;

$tableName = 'roles';

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('tabla roles existe', function () use ($tableName) {
    $this->assertTrue(Schema::hasTable($tableName));
});

test('tabla roles tiene 4 roles', function () use ($tableName) {
    $this->assertDatabaseCount($tableName, 4);
});

test('tuplas en la tabla roles', function () use ($tableName) {
    collect(['admin', 'admision', 'profesor', 'estudiante'])->each(function (string $role) {
        $this->assertDatabaseHas('roles', [
            'name' => $role
        ]);
    });
});


