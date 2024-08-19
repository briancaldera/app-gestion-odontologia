<?php

namespace App\Services;

use App\Models\Historia;

interface CorreccionService
{
    public function attachCorreccion(Historia $historia): void;
    public function addCorreccion(Historia $historia, $data): void;
    public function updateCorreccion(Historia $historia, string $id, string $newContent): void;
}
