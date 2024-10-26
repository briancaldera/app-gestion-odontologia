<?php

namespace App\Models\Group;

use App\Models\Group;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;


/**
 * @property string $id
 * @property string $group_id
 * @property string $name
 * @property string $description
 */
class Assignment extends Model
{
    use HasFactory;
    use HasUlids;

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'assignments';

    protected $fillable = [
        'name',
        'description',
    ];

//    protected function homework(): Attribute
//    {
//        return Attribute::make(
//            get: function (string $values) {
//                $array = json_decode($values, true);
//                return collect($array)->map(fn (array $homework) => new Homework($homework['user_id'], $homework['documents'], $homework['created_at']));
//            },
//            set: fn (Collection $values) => $values->map(fn (Homework $homework) => [
//                'user_id' => $homework->user_id,
//                'documents' => $homework->documents,
//                'created_at' => $homework->created_at,
//            ])
//        );
//    }

    public function homeworks(): HasMany
    {
        return $this->hasMany(Homework::class, 'assignment_id', 'id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'group_id', 'id');
    }

    public static array $actions = [
        'assignments' => [
            'create' => [
                'name' => 'create',
                'display_name' => 'Crear asignaciones',
                'description' => 'Crear nuevas asignaciones en un grupo'
            ],
            'read' => [
                'name' => 'read',
                'display_name' => 'Ver asignaciones',
                'description' => 'Ver las asignaciones en un grupo'
            ],
            'read-private' => [
                'name' => 'read-private',
                'display_name' => 'Ver información privada',
                'description' => 'Ver información privada de las asignaciones en un grupo'
            ],
            'update' => [
                'name' => 'update',
                'display_name' => 'Actualizar asignaciones',
                'description' => 'Actualizar la información de las asignaciones'
            ],
            'delete' => [
                'name' => 'delete',
                'display_name' => 'Eliminar asignaciones',
                'description' => 'Eliminar las asignaciones de un grupo'
            ],
        ]
    ];
}
