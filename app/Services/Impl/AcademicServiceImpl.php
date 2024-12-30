<?php

namespace App\Services\Impl;

use App\Models\AcademicTerm;
use App\Services\AcademicService;

class AcademicServiceImpl implements AcademicService
{
    public function createAcademicTerm(array $data): AcademicTerm
    {
        return AcademicTerm::create($data);
    }

    public function getAcademicTermById(string $id): ?AcademicTerm
    {
        return AcademicTerm::find($id);
    }

    public function updateAcademicTerm(string $id, array $data): bool
    {
        $academicTerm = AcademicTerm::find($id);
        if ($academicTerm) {
            return $academicTerm->update($data);
        }
        return false;
    }

    public function deleteAcademicTerm(string $id): bool
    {
        $academicTerm = AcademicTerm::find($id);
        if ($academicTerm) {
            return $academicTerm->delete();
        }
        return false;
    }
}
