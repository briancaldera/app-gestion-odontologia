<?php

namespace App\Models;

use App\Events\HistoriaCreated;
use App\HasStatus;
use App\Status;
use App\StatusHolder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Support\Facades\Auth;

/**
 * @property string $id the UUID
 * @property string $paciente_id the patient model related to the medical record
 * @property string $numero the id assigned by admision
 * @property string $autor_id the author for the medical record
 * @property Status $status the status
 * @property Correccion $correcciones
 */
class Historia extends Model implements StatusHolder
{
    use HasFactory;
    use HasUuids;
    use HasStatus;

    const HISTORIA_DIR = 'historias/';

    protected $attributes = [
        'numero' => null,
    ];

    protected $fillable = [
        'status',
        'autor_id',
    ];

    protected $dispatchesEvents = [
        'created' => HistoriaCreated::class
    ];

    protected function casts()
    {
        return [
            'status' => Status::class
        ];
    }

    public function autor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'autor_id', 'id');
    }

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

    public function correcciones():HasOne
    {
        return $this->hasOne(Correccion::class);
    }

    public static array $permissions = [
        'historias' => [
            'index-all' => [
                'name' => 'index-all',
                'display_name' => 'Indexar todas las HRA',
                'description' => 'Indexar todas las historias regulares de adulto de todos los usuarios'
            ],
            'create' => [
                'name' => 'create',
                'display_name' => 'Crear HRA',
                'description' => 'Crear historias regulares de adulto'
            ],
            'read' => [
                'name' => 'read',
                'display_name' => 'Ver HRA',
                'description' => 'Ver una historia regular de adulto en particular'
            ],
            'read-private' => [
                'name' => 'read-private',
                'display_name' => 'Ver información privada',
                'description' => 'Ver información privada sobre una historia regular de adulto'
            ],
            'update' => [
                'name' => 'update',
                'display_name' => 'Actualizar HRA',
                'description' => 'Actualizar una historia regular de adulto'
            ],
            'delete' => [
                'name' => 'delete',
                'display_name' => 'Eliminar HRA',
                'description' => 'Eliminar una historia regular de adulto'
            ],
            'change-status' => [
                'name' => 'change-status',
                'display_name' => 'Actualizar el estado',
                'description' => 'Actualizar el estado de una historia regular de adulto'
            ],
            'assign-id' => [
                'name' => 'assign-id',
                'display_name' => 'Asignar número de HRA',
                'description' => 'Asignar número a una historia regular de adulto'
            ]
        ]
    ];
}
