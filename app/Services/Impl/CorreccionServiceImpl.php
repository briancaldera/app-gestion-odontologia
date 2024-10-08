<?php

namespace App\Services\Impl;

use App\Models\Historia;
use App\Services\CorreccionService;
use Illuminate\Support\Str;


class CorreccionServiceImpl implements CorreccionService
{

    public function attachCorreccion(Historia $historia): void
    {
        $historia->correcciones()->create();
    }

    public function addCorreccion(Historia $historia, string $userId, string $content): void
    {
        $data = [
            'id' => Str::ulid()->toString(),
            'user' => $userId,
            'content' => $content,
            'created' => now(),
            'updated' => null,
            'seen' => null,
        ];

        $historia->correcciones->correcciones->add($data);
        $historia->correcciones->save();
    }

    public function updateCorreccion(Historia $historia, string $id, string $newContent): void
    {
        $correcciones = $historia->correcciones;
        $correcciones->correcciones->transform(function ($item) use ($id, $newContent) {
            if ($item['id'] === $id) {
                $item['content'] = $newContent;
                $item['updated'] = now();
            }
            return $item;
        });

        $correcciones->save();
    }

    public function deleteCorreccion(Historia $historia, string $id): void
    {
        $correcciones = $historia->correcciones;
        $correcciones->correcciones = $correcciones->correcciones->reject(fn ($item) => $item['id'] === $id);
        $correcciones->save();
    }
}
