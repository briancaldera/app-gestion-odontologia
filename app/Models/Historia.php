<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historia extends Model
{
    use HasFactory;
    use HasUlids;

    protected $attributes = [
        'numero' => ''
    ];

    protected $fillable = [
        'motivo_consulta',
        'enfermedad_actual'
    ];
}
