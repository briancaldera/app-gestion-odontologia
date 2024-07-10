<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
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

    protected $fillable = [
        'cardiovasculares',
        'hematologicos',
        'respiratorios',
        'endocrinos',
        'gastrointestinales',
        'neurologicos',
        'oseos',
        'ginecologicos',
        'urologicos',
        'infectocontagiosa',
    ];

    protected function casts()
    {
        return [
            'cardiovasculares' => AsArrayObject::class,
            'hematologicos' => AsArrayObject::class,
            'respiratorios' => AsArrayObject::class,
            'endocrinos' => AsArrayObject::class,
            'gastrointestinales' => AsArrayObject::class,
            'neurologicos' => AsArrayObject::class,
            'oseos' => AsArrayObject::class,
            'ginecologicos' => AsArrayObject::class,
            'urologicos' => AsArrayObject::class,
            'infectocontagiosa' => AsArrayObject::class,
        ];
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }
}
