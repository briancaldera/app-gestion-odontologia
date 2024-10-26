<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $historia_id the medical record id
 * @property array|Json $medicamentos the current medication
 * @property array|Json $alergias the allergies
 */
class AntPersonales extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'ant_personales';
    protected $primaryKey = 'historia_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $attributes = [
        'medicamentos' => <<<'JSON'
{
"tipo": [],
"dosis": null
}
JSON,
        'alergias' => <<<'JSON'
{
"tipo": [],
"descripcion": null
}
JSON,
    ];

    protected $fillable = [
        'medicamentos',
        'alergias',
    ];

    protected function casts(): array
    {
        return [
            'medicamentos' => AsArrayObject::class,
            'alergias' => AsArrayObject::class,
        ];
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }
}
