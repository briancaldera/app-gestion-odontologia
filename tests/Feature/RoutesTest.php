<?php

test('has Home page', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('has Register page', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('has Login page', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});
