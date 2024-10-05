<?php

namespace App\Casts\Group;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use App\ValueObjects\Group\Homework as HomeworkValueObject;
use InvalidArgumentException;

class Homework implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): HomeworkValueObject
    {
        return new HomeworkValueObject(
            $attributes['user_id'],
            $attributes['documents'],
            $attributes['created_at'],
        );
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): array
    {
        if (! $value instanceof HomeworkValueObject) {
            throw new InvalidArgumentException('The given value is not an Homework instance.');
        }

        return [
            'user_id' => $value->user_id,
            'documents' => $value->documents,
            'created_at' => $value->created_at,
        ];
    }
}
