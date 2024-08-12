<?php

use App\Models\Historia;
use App\Services\Impl\RadiografiaServiceImpl;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('Can create Radiografia folder', function () {
    $faker = fake('es_VE');
    $fake_dir = 'RadiografiaTest';

    $historia_id = $faker->uuid();

    $dir_path = normalize_path(Historia::HISTORIA_DIR . $historia_id. '/' . RadiografiaServiceImpl::ODONTOLOGIA_DIR . RadiografiaServiceImpl::RADIOGRAFIA_DIR);
    dump($dir_path);

    Storage::fake($fake_dir)->makeDirectory($dir_path);

    Storage::assertDirectoryEmpty($dir_path);
});

