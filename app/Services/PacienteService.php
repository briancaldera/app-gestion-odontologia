<?php

namespace App\Services;

use App\Models\Paciente;
use Illuminate\Http\UploadedFile;

interface PacienteService
{
    public function storePaciente(array $data): Paciente;
}

class PacienteServiceImpl implements PacienteService
{
    const PACIENTE_PHOTO_DIR = 'pacientes/photos/';

    public function storePaciente(array $data): Paciente
    {
        if ($data['foto']) {
            $foto_url = $this->savePhotoToFilesystem($data['foto']);
        }

        return Paciente::create([
            ...$data,
            'foto_url' => $foto_url ?? null,
        ]);
    }

    private function savePhotoToFilesystem(UploadedFile $file): string
    {
        $now = now();
        return $file->store(self::PACIENTE_PHOTO_DIR . $now->year . '/'. $now->month . '/');
    }
}
