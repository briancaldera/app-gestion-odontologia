<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @property string $id
 * @property string $owner
 * @property Collection<User> $members
 * @property string $name
 * @property string $updated_at
 * @property string $created_at
 */
class Group extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $attributes = [
        'members' => '[]',
    ];

    protected function members(): Attribute
    {
        return Attribute::make(
            /** @var Collection<string> $members */
            /** @returns Collection<User> */
            get: function (string $members): Collection {
                $arr = json_decode($members);
                $collection = collect($arr);
                return $collection->map(fn(string $id) => User::find($id));
            },
            /** @var Collection<User> $members */
            /** @returns Collection<string> */
            set: function (Collection $members) {
                return $members->map(fn(User $member) => $member->id);
            }
        );
    }
}
