<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Extras extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = 'extras';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $attributes = [
        'extras' => <<<'JSON'
{
"correcciones": {
"secciones": {}
},
"nota": null
}
JSON,];

    protected function casts()
    {
        return [
            'extras' => 'collection'
        ];
    }

    public function historia(): BelongsTo
    {
        return $this->belongsTo(Historia::class, 'historia_id', 'id');
    }
}
