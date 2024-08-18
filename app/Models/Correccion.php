<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsCollection;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

/**
 * @property Collection $correcciones
 */
class Correccion extends Model
{

    use HasFactory;

    protected $primaryKey = 'historia_id';
    public $incrementing = false;

    protected $attributes = [
        'correcciones' => '[]',
    ];

    protected function casts()
    {
        return [
            'correcciones' => AsCollection::class,
        ];
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }
}
