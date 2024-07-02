<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

/**
 * @property string $id the UUID
 * @property string $paciente_id the patient model related to the medical record
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

    public function antFamiliares(): HasOne
    {
        return $this->hasOne(AntFamiliares::class);
    }

    public function antPersonales(): HasOne
    {
        return $this->hasOne(AntPersonales::class);
    }

    public function trastornos(): HasOne
    {
        return $this->hasOne(Trastornos::class);
    }

    public function historiaOdontologica(): HasOne
    {
        return $this->hasOne(HistoriaOdontologica::class);
    }


}
