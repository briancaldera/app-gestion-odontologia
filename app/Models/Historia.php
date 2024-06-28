<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Historia extends Model
{
    use HasFactory;
    use HasUuids;

    protected $attributes = [
        'numero' => ''
    ];

    protected $fillable = [
        'motivo_consulta',
        'enfermedad_actual'
    ];

    public function historiaOdontologica(): HasOne
    {
        return $this->hasOne(HistoriaOdontologica::class);
    }
}
