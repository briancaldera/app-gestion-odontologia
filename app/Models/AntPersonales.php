<?php

namespace App\Models;

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

    protected $primaryKey = 'historia_id';
    public $incrementing = false;

    protected $fillable = [
        'medicamentos',
        'alergias',
    ];

    protected function casts(): array
    {
        return [
            'medicamentos' => 'array',
            'alergias' => 'array',
        ];
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }
}
