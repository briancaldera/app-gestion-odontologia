<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property string $id the UUID
 * @property string $numero the id assigned by admision
 * @property string $motivo_consulta the reason for the consultation
 * @property string $enfermedad_actual current disease
 * @property int $status the status
 */
class Historia extends Model
{
    use HasFactory;
    use HasUuids;

    protected $attributes = [
        'numero' => '',
        'status' => 'abierta',
        'motivo_consulta' => '',
        'enfermedad_actual' => '',
    ];

    protected $fillable = [
        'motivo_consulta',
        'enfermedad_actual'
    ];

    public function paciente(): BelongsTo
    {
        return $this->belongsTo(Paciente::class);
    }

    public function historiaOdontologica(): HasOne
    {
        return $this->hasOne(HistoriaOdontologica::class);
    }


}
