<?php

use App\Services\AcademicService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
test('se puede crear un periodo academico', function () {
    // Arrange
    $service = $this->app->make(AcademicService::class);

    $data = [
        'name' => '2021-1',
        'code' => '2021-1',
        'start_date' => '2021-01-01',
        'end_date' => '2021-06-30',
    ];

    // Act
    $academicTerm = $service->createAcademicTerm($data);

    // Assert
    expect($academicTerm)->toBeInstanceOf('App\Models\AcademicTerm')
        ->and($academicTerm->name)->toBe('2021-1')
        ->and($academicTerm->code)->toBe('2021-1')
        ->and($academicTerm->start_date)->toBe('2021-01-01');
});

test('se puede actualizar un periodo academico', function () {
    // Arrange
    $service = $this->app->make(AcademicService::class);

    $data = [
        'name' => '2021-1',
        'code' => '2021-1',
        'start_date' => '2021-01-01',
        'end_date' => '2021-06-30',
    ];

    $academicTerm = $service->createAcademicTerm($data);

    // Act
    $res = $service->updateAcademicTerm($academicTerm->id, [
        'name' => '2021-2',
    ]);

    // Assert
    expect($res)->toBeTrue()
        ->and($academicTerm->refresh()->name)->toBe('2021-2');
});

test('se puede eliminar un periodo academico', function () {
    // Arrange
    $service = $this->app->make(AcademicService::class);

    $data = [
        'name' => '2021-1',
        'code' => '2021-1',
        'start_date' => '2021-01-01',
        'end_date' => '2021-06-30',
    ];

    $academicTerm = $service->createAcademicTerm($data);

    // Act
    $res = $service->deleteAcademicTerm($academicTerm->id);

    // Assert
    expect($res)->toBeTrue()
        ->and($service->getAcademicTermById($academicTerm->id))->toBeNull();
});



