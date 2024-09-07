<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

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

    public $incrementing = false;

    protected $fillable = [
        'name',
        'owner_id',
        'members'
    ];

    protected $attributes = [
        'members' => '[]',
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

        if ($user->isAdmin() OR $user->isAdmision()) {
            return [];
        }

        return $this->visible;
    }

    protected $visible = [
        'id',
        'owner',
        'name',
        'created_at',
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
}
