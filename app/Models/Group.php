<?php

namespace App\Models;

use App\Models\Group\Assignment;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @property string $id
 * @property User $owner
 * @property Collection<User> $members
 * @property string $name
 * @property string $updated_at
 * @property string $created_at
 */
class Group extends Model
{
    use HasFactory, HasUlids;

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    protected $table = 'groups';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'owner_id',
        'members'
    ];

    protected $attributes = [
        'members' => '[]',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    protected function members(): Attribute
    {
        return Attribute::make(
        /** @var Collection<string> $members */
        /** @returns Collection<User> */
            get: function (string $members): Collection {
                $arr = json_decode($members);
                $collection = collect($arr);
                return $collection->map(fn(string $id) => User::find($id))->reject(fn($user) => $user == null);
            },
            /** @var Collection<User> $members */
            /** @returns Collection<string> */
            set: function (Collection $members): string {
                return $members->map(fn(User $member) => $member->id);
            }
        );
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class);
    }

    public static array $actions = [
        'groups' => [
            'index-all' => [
                'name' => 'index-all',
                'display_name' => 'Indexar grupos',
                'description' => 'Indexar a todos los grupos del sistema'
            ],
            'create' => [
                'name' => 'create',
                'display_name' => 'Crear grupos',
                'description' => 'Crear un nuevo grupo'
            ],
            'read' => [
                'name' => 'read',
                'display_name' => 'Ver grupos',
                'description' => 'Ver la información sobre un grupo'
            ],
            'read-private' => [
                'name' => 'read-private',
                'display_name' => 'Ver información privada',
                'description' => 'Ver la información privada sobre un grupo'
            ],
            'update' => [
                'name' => 'update',
                'display_name' => 'Actualizar grupos',
                'description' => 'Actualizar la información sobre un grupo'
            ],
            'delete' => [
                'name' => 'delete',
                'display_name' => 'Eliminar grupos',
                'description' => 'Eliminar un grupo del sistema'
            ],
            'index-users' => [
                'name' => 'index-users',
                'display_name' => 'Indexar usuarios',
                'description' => 'Indexar a los miembros de un grupo'
            ],
            'add-users' => [
                'name' => 'add-users',
                'display_name' => 'Agregar usuarios',
                'description' => 'Agregar un nuevo usuario a un grupo'
            ],
            'remove-users' => [
                'name' => 'remove-users',
                'display_name' => 'Remover usuarios',
                'description' => 'Remover un usuario de un grupo'
            ],
        ]
    ];
}
