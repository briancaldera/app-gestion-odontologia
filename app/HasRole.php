<?php

namespace App;

trait HasRole
{
    protected string $role_key = 'role';

    public function isAdmin(): bool
    {
        return $this->getAttribute($this->role_key) == 0;
    }

    public function isAdmision(): bool
    {
        return $this->getAttribute($this->role_key) == 1;
    }

    public function isProfesor(): bool
    {
        return $this->getAttribute($this->role_key) == 2;
    }

    public function isEstudiante(): bool
    {
        return $this->getAttribute($this->role_key) == 3;
    }
}
