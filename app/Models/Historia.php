<?php

namespace App\Models;

use App\HasStatus;
use App\Observers\HistoriaObserver;
use App\Status;
use App\StatusHolder;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Collection;

/**
 * @property string $id the UUID
 * @property string $paciente_id the patient model related to the medical record
 * @property string $numero the id assigned by admision
 * @property string $autor_id the author for the medical record
 * @property string $motivo_consulta
 * @property string $enfermedad_actual
 * @property Status $status the status
 * @property Correccion $correcciones
 * @property Collection $shared_with
 */
#[ObservedBy([HistoriaObserver::class])]
class Historia extends Model implements StatusHolder
{
    use HasFactory;
    use HasUuids;
    use HasStatus;

    const HISTORIA_DIR = 'historias/';

    protected $table = 'historias';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $attributes = [
        'numero' => null,
        'semestre' => null,
        'motivo_consulta' => null,
        'enfermedad_actual' => null,
        'shared_with' => '[]'
    ];

    protected $fillable = [
        'numero',
        'semestre',
        'status',
        'autor_id',
        'motivo_consulta',
        'enfermedad_actual',
    ];

    protected function casts()
    {
        return [
            'status' => Status::class,
            'shared_with' => 'collection',
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

    public function extras(): HasOne
    {
        return $this->hasOne(Extras::class, 'historia_id', 'id');
    }

    public function scopeHomework(Builder $query): void
    {
        $query->select('*')->from('homeworks')->whereJsonContains('documents->id', $this->id);
    }

    public static array $actions = [
        'historias' => [
            'full-control' => [
                'name' => 'full-control',
                'display_name' => 'Full control sobre las historias',
                'description' => 'Full control sobre el modelo de historia clínica'
            ],
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
            'update-status' => [
                'name' => 'update-status',
                'display_name' => 'Actualizar el estado',
                'description' => 'Actualizar el estado de una historia regular de adulto'
            ],
            'assign-id' => [
                'name' => 'assign-id',
                'display_name' => 'Asignar número de HRA',
                'description' => 'Asignar número a una historia regular de adulto'
            ],
            'assign-semester' => [
                'name' => 'assign-semester',
                'display_name' => 'Asignar semestre',
                'description' => 'Asignar semestre a la HRA'
            ],
            'approve-treatment' => [
                'name' => 'approve-treatment',
                'display_name' => 'Aprobar tratamiento',
                'description' => 'Aprobar tratamiento en la secuencia de tratamiento y modificaciones del plan de tratamiento'
            ],
            'approve-plaque-control' => [
                'name' => 'approve-plaque-control',
                'display_name' => 'Aprobar control de placa',
                'description' => 'Aprobar el control de placa'
            ],
            'approve-periodontal-discharge' => [
                'name' => 'approve-periodontal-discharge',
                'display_name' => 'Aprobar de alta periodontal',
                'description' => 'Aprobar de alta periodontal de un paciente'
            ],
        ]
    ];
}
