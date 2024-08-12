<?php

namespace App\Services;

interface RadiografiaService
{
    public function saveRadiografiaFiles(string $historia_id, array $radiografias): array;
}
