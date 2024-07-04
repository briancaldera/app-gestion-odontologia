<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $historia_id the medical record id
 * @property string $ant_personales the dental history
 * @property array|Json $habitos the manners of the patient
 * @property array|Json $examen_fisico the information about the physical examination
 * @property array|Json $estudio_modelos the models examination
 * @property array|Json $plan_tratamiento the treatment plan
 * @property array|Json $modificaciones_plan_tratamiento the modifications to the treatment plan
 * @property array|Json $secuencia_tratamiento the sequence of treatments undergone by the patient
 */
class HistoriaOdontologica extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'historia_id';
    public $incrementing = false;

    protected function casts()
    {
        return [
            'habitos' => 'array',
            'examen_fisico' => 'array',
            'estudio_modelos' => 'array',
            'plan_tratamiento' => 'array',
            'modificaciones_plan_tratamiento' => 'array',
            'secuencia_tratamiento' => 'array',
        ];
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }
}
