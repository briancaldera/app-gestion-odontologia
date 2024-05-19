<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Trastornos extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'paciente_id';
    public $incrementing = false;

    public function antPersonales(): BelongsTo
    {
        return $this->belongsTo(AntPersonales::class);
    }
}
