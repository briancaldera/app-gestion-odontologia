<?php

namespace App\ValueObjects\Group;

class Comment
{
    private string $visibility = 'private';
    /**
     * Create a new class instance.
     */
    public function __construct(public $id, public $author, public $content, public $created_at)
    {

    }
}
