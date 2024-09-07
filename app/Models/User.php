<?php

namespace App\Models;

use App\HasRole;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Metadata\Api\Groups;

/**
 * @property int $role the role for the user
 * @property string $id
 * @property string $name
 * @property string $email
 * @property string $email_verified_at
 * @property string $password
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasUuids, HasRole;

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'role' => 3,
    ];

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
     * @return string[]
     */
    public function getVisible(): array
    {
        /* @var User $user*/
        $user = Auth::user();

        if (!isset($user)) {
            return $this->visible;
        }

        if ($user->id === $this->id) {
            return [];
        }

        if ($user->isAdmin() OR $user->isAdmision()) {
            return [];
        }

        return $this->visible;
    }

    protected $visible = [
        'id',
        'name'
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

    public function groups(): Collection
    {
        return Group::whereJsonContains('members', $this->id)->get();
    }
}
