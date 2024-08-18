<?php

namespace App\Services;

use App\Models\Historia;

interface CorreccionService
{
    public function crearCorreccion(Historia $historia);
    public function addCorreccion(Historia $historia, $data);
}
