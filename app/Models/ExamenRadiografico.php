<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $historia_id the medical record id
 * @property array|Json $interpretacion_panoramica
 * @property string $interpretacion_periapicales
 * @property string $interpretacion_coronales
 */
class ExamenRadiografico extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'historia_id';
    public $incrementing = false;

    protected function casts()
    {
        return [
            'interpretacion_panoramica' => 'array',
        ];
    }

    public function historiaOdontologica(): BelongsTo
    {
        return $this->belongsTo(HistoriaOdontologica::class, 'historia_id');
    }
}
