<?php

namespace App\Services;

use App\Models\AcademicTerm;
use Illuminate\Support\Collection;

interface AcademicService
{
    public function createAcademicTerm(array $data): AcademicTerm;

    public function getAcademicTermById(string $id): ?AcademicTerm;

    public function updateAcademicTerm(string $id, array $data): bool;

    public function deleteAcademicTerm(string $id): bool;

    public function getAllAcademicTerms(): Collection;
}
