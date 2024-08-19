<?php

namespace App\Services\Impl;

use App\Models\Historia;
use App\Services\CorreccionService;
use Illuminate\Support\Collection;


class CorreccionServiceImpl implements CorreccionService
{

    public function attachCorreccion(Historia $historia): void
    {
        $historia->correcciones()->create();
    }

    public function addCorreccion(Historia $historia, $data)
    {
        $historia->correcciones->correcciones->add($data);
        $historia->correcciones->save();
    }
}
