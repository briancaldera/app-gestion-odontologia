<?php

namespace App\ValueObjects\Group;

use Illuminate\Contracts\Database\Eloquent\Castable;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Contracts\Database\Eloquent\CastsInboundAttributes;
use Illuminate\Database\Eloquent\Model;

class Homework implements Castable
{
    /**
     * Create a new class instance.
     */
    public function __construct(public string $user_id, public array $documents, public string $created_at)
    {

    }

    public static function castUsing(array $arguments): CastsAttributes
    {
        return new class implements CastsAttributes
        {
            public function get(Model $model, string $key, mixed $value, array $attributes): Homework
            {
                return new Homework(

                );
            }

            public function set(Model $model, string $key, mixed $value, array $attributes): array
            {
                return [

                ];
            }
        };
    }
}
