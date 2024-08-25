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

    public function hasRole(string $role): bool {
        return $this->role == $this->mapRoleToRoleId($role);
    }

    private function mapRoleToRoleId(string $role): int
    {
        $id = -1;
        switch ($role) {
            case 'admin':
                $id = 0;
                break;
            case 'admision':
                $id = 1;
                break;
            case 'profesor':
                $id = 2;
                break;
            case 'estudiante':
                $id = 3;
                break;
            default:
                abort('500', 'No such role');
        }
        return $id;
    }
}
