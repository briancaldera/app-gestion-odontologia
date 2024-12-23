<?php

use App\Models\Role;
use App\Models\User;
use App\Models\UserCode;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

test('registration screen can be rendered', function () {
    // Arrange
    // Act
    $response = $this->get('/register');

    // Assert
    $response->assertStatus(200);
});

test('usuario sin codigo no se puede registrar', function () {
    // Arrange
    // Act
    $response = $this->post('/register', [
        'code' => '',
        'name' => 'testuser',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Assert
    $this->assertGuest();
    $response->assertFound();
    $response->assertValid(['name', 'email', 'password', 'password_confirmation']);
    $response->assertInvalid(['code']);
});

test('usuario con codigo se puede registrar', function () {
    // Arrange
    $faker = fake();
    $faker->seed(1000);

    $code = $faker->uuid();

    $initialRole = Role::where('name', 'estudiante')->first();

    $userCode = new UserCode();
    $userCode->role_id = $initialRole->id;
    $userCode ->code= $code;

    $userCode->save();

    // Act
    $response = $this->post('/register', [
        'code' => $userCode->code,
        'name' => 'testuser',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Assert
    $response->assertRedirectToRoute('dashboard');
    $this->assertAuthenticated();
});

test('codigo no puede ser reusado por otro usuario', function () {
    // Arrange
    $faker = fake();
    $faker->seed(1000);

    $code = $faker->uuid();

    $initialRole = Role::where('name', 'estudiante')->first();

    $userCode = new UserCode();
    $userCode->role_id = $initialRole->id;
    $userCode ->code= $code;

    $userCode->save();

    // Act
    $response = $this->post('/register', [
        'code' => $userCode->code,
        'name' => 'testuser',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->post(route('logout'));
    $this->assertGuest();

    $response = $this->post('/register', [
        'code' => $userCode->code,
        'name' => 'testuser2',
        'email' => 'test2@example.com',
        'password' => 'password2',
        'password_confirmation' => 'password2',
    ]);

    // Assert
    $this->assertGuest();
    $this->assertDatabaseMissing('users', ['name' => 'testuser2']);
    $userCode->refresh();
    expect($userCode->user_id)->not()->toBeNull();
});

test('nombre de usuario no puede estar duplicado', function () {
    // Arrange
    $faker = fake();
    $faker->seed(1000);

    $code = $faker->uuid();

    $initialRole = Role::where('name', 'estudiante')->first();

    $user = User::create([
        'name' => 'testuser',
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $userCode = new UserCode();
    $userCode->role_id = $initialRole->id;
    $userCode->code = $faker->uuid();
    $userCode->user_id = $user->id;
    $userCode->save();

    $userCode2 = new UserCode();
    $userCode2->role_id = $initialRole->id;
    $userCode2->code = $faker->uuid();
    $userCode2->save();

    // Act
    $response = $this->post('/register', [
        'code' => $userCode2->code,
        'name' => 'testuser',
        'email' => 'test2@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Assert
    $response->assertInvalid(['name']);
    $this->assertGuest();
});

test('correo electronico no puede estar duplicado', function () {
    // Arrange
    $faker = fake();
    $faker->seed(1000);

    $code = $faker->uuid();

    $initialRole = Role::where('name', 'estudiante')->first();

    $user = User::create([
        'name' => 'testuser',
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $userCode = new UserCode();
    $userCode->role_id = $initialRole->id;
    $userCode->code = $faker->uuid();
    $userCode->user_id = $user->id;
    $userCode->save();

    $userCode2 = new UserCode();
    $userCode2->role_id = $initialRole->id;
    $userCode2->code = $faker->uuid();
    $userCode2->save();

    // Act
    $response = $this->post('/register', [
        'code' => $userCode2->code,
        'name' => 'testuser2',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Assert
    $response->assertInvalid(['email']);
    $this->assertGuest();
});
