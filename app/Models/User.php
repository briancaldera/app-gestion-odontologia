<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Translation\HasLocalePreference;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Contracts\LaratrustUser;
use Laratrust\Traits\HasRolesAndPermissions;

/**
 * @property string $id
 * @property string $name
 * @property string $email
 * @property string $email_verified_at
 * @property string $password
 */
class User extends Authenticatable implements MustVerifyEmail, LaratrustUser, HasLocalePreference
{
    use HasFactory, Notifiable, HasUuids;
    use HasRolesAndPermissions;

    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     * These attributes should never be serialized. Not even for an admin or superuser.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function historias(): HasMany
    {
        return $this->hasMany(Historia::class, 'autor_id', 'id');
    }

    public function group(): HasOne
    {
        return $this->hasOne(Group::class, 'owner_id', 'id');
    }

    public function groups(): Collection
    {
        return Group::whereJsonContains('members', $this->id)->get();
    }

    public function preferredLocale(): string
    {
        return 'es';
    }

    public static array $actions = [
        'users' => [
            'full-control' => [
                'name' => 'full-control',
                'display_name' => 'Full control sobre los usuarios',
                'description' => 'Full control sobre el modelo de usuario'
            ],
            'index-all' => [
                'name' => 'index-all',
                'display_name' => 'Indexar usuarios',
                'description' => 'Indexar a todos los usuarios del sistema'
            ],
            'create' => [
                'name' => 'create',
                'display_name' => 'Crear usuarios',
                'description' => 'Crear un nuevo usuario'
            ],
            'read' => [
                'name' => 'read',
                'display_name' => 'Ver usuario',
                'description' => 'Ver información de un usuario en particular'
            ],
            'read-private' => [
                'name' => 'read-private',
                'display_name' => 'Ver información privada',
                'description' => 'Ver información privada de un usuario en particular'
            ],
            'update' => [
                'name' => 'update',
                'display_name' => 'Actualizar usuarios',
                'description' => 'Actualizar la información de un usuario'
            ],
            'delete' => [
                'name' => 'delete',
                'display_name' => 'Eliminar usuarios',
                'description' => 'Eliminar un usuario del sistema'
            ],
            'add-registry' => [
                'name' => 'add-registration',
                'display_name' => 'Agregar registro',
                'description' => 'Agregar el código de un usuario al sistema para permitir su registro'
            ]
        ]
    ];
}
