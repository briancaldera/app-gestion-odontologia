<?php

namespace App\Services;

use App\Models\Historia;

interface CorreccionService
{
    public function attachCorreccion(Historia $historia): void;
    public function addCorreccion(Historia $historia, string $userId, string $content): void;
    public function updateCorreccion(Historia $historia, string $id, string $newContent): void;
    public function deleteCorreccion(Historia $historia, string $id): void;
}
