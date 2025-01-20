<?php

use App\Models\User;
use App\Models\UserCode;
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

test('usuario se puede crear', function () {
    // Arrange
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    // Act
    $res = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'password',
    ]);
    // Assert
    $res->assertStatus(422);
});

test('usuario no se puede crear con correo vacio', function () {
    // Arrange
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    // Act
    $res = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => '',
        'password' => 'password',
    ]);
    // Assert
    $res->assertStatus(422);
});

test('valid user creation', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201);
});

test('user creation with invalid code', function () {
    $response = $this->postJson('register', [
        'code' => 'invalid_code',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with empty code', function () {
    $response = $this->postJson('register', [
        'code' => '',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with empty name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => '',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with empty email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => '',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with invalid email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'invalid_email',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with empty password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => '',
        'password_confirmation' => '',
    ]);

    $response->assertStatus(422);
});

test('user creation with short password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'short',
        'password_confirmation' => 'short',
    ]);

    $response->assertStatus(422);
});

test('user creation with non-matching passwords', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'different_password',
    ]);

    $response->assertStatus(422);
});

test('user creation with existing email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();
    User::factory()->create(['email' => 'username@example.com']);

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with existing name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();
    User::factory()->create(['name' => 'username']);

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'newuser@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with special characters in name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'user@name',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with long name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => str_repeat('a', 256),
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with long email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => str_repeat('a', 256) . '@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with long password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => str_repeat('a', 256),
        'password_confirmation' => str_repeat('a', 256),
    ]);

    $response->assertStatus(422);
});

test('user creation with numeric name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => '123456',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with numeric email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => '123456@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201);
});

test('user creation with numeric password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => '123456',
        'password_confirmation' => '123456',
    ]);

    $response->assertStatus(201);
});

test('user creation with special characters in email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'user@name@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201);
});

test('user creation with special characters in password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'p@ssw0rd!',
        'password_confirmation' => 'p@ssw0rd!',
    ]);

    $response->assertStatus(201);
});

test('user creation with mixed case email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'UserName@Example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201);
});

test('user creation with mixed case name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'UserName',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(201);
});

test('user creation with mixed case password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'PassWord',
        'password_confirmation' => 'PassWord',
    ]);

    $response->assertStatus(201);
});

test('user creation with spaces in name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'user name',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with spaces in email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'user name@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with spaces in password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'pass word',
        'password_confirmation' => 'pass word',
    ]);

    $response->assertStatus(201);
});

test('user creation with leading spaces in name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => ' username',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with leading spaces in email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => ' username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with leading spaces in password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => ' password',
        'password_confirmation' => ' password',
    ]);

    $response->assertStatus(201);
});

test('user creation with trailing spaces in name', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username ',
        'email' => 'username@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with trailing spaces in email', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com ',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertStatus(422);
});

test('user creation with trailing spaces in password', function () {
    $user_code = new UserCode();
    $user_code->code = '123456';
    $user_code->role_id = 4;
    $user_code->save();

    $response = $this->postJson('register', [
        'code' => '123456',
        'name' => 'username',
        'email' => 'username@example.com',
        'password' => 'password ',
        'password_confirmation' => 'password ',
    ]);

    $response->assertStatus(201);
});
