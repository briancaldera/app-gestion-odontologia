<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Paciente extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'cedula',
        'nombre',
        'apellido',
        'edad',
        'sexo',
        'peso',
        'fecha_nacimiento',
        'ocupacion',
        'direccion',
        'telefono',
        'foto',
    ];

    public function antFamiliares(): HasOne
    {
        return $this->hasOne(AntFamiliares::class);
    }

    public function antPersonales(): HasOne
    {
        return $this->hasOne(AntPersonales::class);
    }

    public function trastornos(): HasOneThrough
    {
        return $this->hasOneThrough(Trastornos::class, AntPersonales::class);
    }
}
