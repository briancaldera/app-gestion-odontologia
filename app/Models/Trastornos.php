<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $historia_id the medical record id
 * @property array|Json $cardiovasculares
 * @property array|Json $hematologicos
 * @property array|Json $respiratorios
 * @property array|Json $endocrinos
 * @property array|Json $gastrointestinales
 * @property array|Json $neurologicos
 * @property array|Json $oseos
 * @property array|Json $ginecologicos
 * @property array|Json $urologicos
 * @property array|Json $infectocontagiosa
 */
class Trastornos extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'historia_id';
    public $incrementing = false;

    protected function casts()
    {
        return [
            'cardiovasculares' => 'array',
            'hematologicos' => 'array',
            'respiratorios' => 'array',
            'endocrinos' => 'array',
            'gastrointestinales' => 'array',
            'neurologicos' => 'array',
            'oseos' => 'array',
            'ginecologicos' => 'array',
            'urologicos' => 'array',
            'infectocontagiosa' => 'array',
        ];
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }
}
