<?php

namespace App\Models\Group;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

/**
 * @property string $id
 * @property string $user_id
 * @property string $assignment_id
 * @property Collection $documents
 */
class Homework extends Model
{
    use HasFactory;
    use HasUlids;

    protected $primaryKey = 'id';
    protected $table = 'homeworks';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'documents',
    ];

    protected $attributes = [
        'documents' => '[]'
    ];

    protected $casts = [
        'documents' => 'collection'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function assignment(): BelongsTo
    {
        return $this->belongsTo(Assignment::class, 'assignment_id', 'id');
    }

    public static array $actions = [
        'homeworks' => [
            'full-control' => [
                'name' => 'full-control',
                'display_name' => 'Full control sobre las entregas',
                'description' => 'Full control sobre las entregas'
            ],
            'index-all' => [
                'name' => 'index-all',
                'display_name' => 'Indexar entregas',
                'description' => 'Indexar todas las entregas hechas por los usuarios'
            ],
            'create' => [
                'name' => 'create',
                'display_name' => 'Crear entregas',
                'description' => 'Crear entregas en las asignaciones'
            ],
            'read' => [
                'name' => 'read',
                'display_name' => 'Ver entregas',
                'description' => 'Ver la información de las entregas'
            ],
            'update' => [
                'name' => 'update',
                'display_name' => 'Actualizar entregas',
                'description' => 'Actualizar la información de una entraga'
            ],
            'delete' => [
                'name' => 'delete',
                'display_name' => 'Eliminar entregas',
                'description' => 'Elimina una entrega realizada'
            ],
            'create-corrections' => [
                'name' => 'create-corrections',
                'display_name' => 'Crear correcciones',
                'description' => 'Agregar correcciones a una entrega'
            ],
        ]
    ];
}
