<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AntFamiliares extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'historia_id';
    public $incrementing = false;

    protected $fillable = [
        'madre',
        'padre',
        'hermanos',
        'abuelos_maternos',
        'abuelos_paternos',
    ];

    protected $attributes = [
        'madre' => '',
        'padre' => '',
        'hermanos' => '',
        'abuelos_maternos' => '',
        'abuelos_paternos' => '',
    ];

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class);
    }
}
