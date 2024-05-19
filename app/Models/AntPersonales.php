<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AntPersonales extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'paciente_id';
    public $incrementing = false;

    public function paciente(): BelongsTo
    {
        return $this->belongsTo(Paciente::class);
    }

    public function trastornos(): HasOne
    {
        return $this->hasOne(Trastornos::class, 'paciente_id');
    }
}
