<?php

namespace App\Services;

use App\Models\Historia;

interface CorreccionService
{
    public function attachCorreccion(Historia $historia);
    public function addCorreccion(Historia $historia, $data);
}
