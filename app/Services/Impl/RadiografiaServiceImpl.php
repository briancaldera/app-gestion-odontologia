<?php

namespace App\Services\Impl;

use App\Models\Historia;
use App\Services\RadiografiaService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;


class RadiografiaServiceImpl implements RadiografiaService
{

    const ODONTOLOGIA_DIR = 'odontologia/';
    const RADIOGRAFIA_DIR = 'radiografias/';

    public function saveRadiografiaFiles(string $historia_id, array $radiografias): array
    {
        $dir_path = normalize_path(Historia::HISTORIA_DIR . $historia_id . '/' . self::ODONTOLOGIA_DIR . self::RADIOGRAFIA_DIR);

        $this->createHistoriaRadiografiaFolder($historia_id);

        $files = collect($radiografias);

        return $files->map(fn (UploadedFile $file) => $file->store($dir_path))->toArray();
    }


    private function createHistoriaRadiografiaFolder(string $historia_id)
    {
        $dir_path = normalize_path(Historia::HISTORIA_DIR . $historia_id . '/' . self::ODONTOLOGIA_DIR . self::RADIOGRAFIA_DIR);

        if (!Storage::directoryExists($dir_path)) {
            Storage::makeDirectory($dir_path);
        }
    }
}
