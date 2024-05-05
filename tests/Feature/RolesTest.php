<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$tableName = 'roles';

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('roles table exists', function() use ($tableName) {

    $this->assertTrue(Schema::hasTable('roles'));
});

test('there are 4 rows in the role table', fn() => $this->assertDatabaseCount($tableName, 4));

test('dataset in the roles table', function() use ($tableName) {
    $this->assertDatabaseHas('roles', [
        'nombre' => 'admin'
    ]);

    $this->assertDatabaseHas('roles', [
        'nombre' => 'admision'
    ]);

    $this->assertDatabaseHas('roles', [
        'nombre' => 'profesor'
    ]);

    $this->assertDatabaseHas('roles', [
        'nombre' => 'estudiante'
    ]);
});
