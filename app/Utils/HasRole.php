<?php

namespace App\Utils;

trait HasRole
{
    function mapRoleToRoleId(string $role): int
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

    public function hasRole(string $role): bool {
        return $this->role == $this->mapRoleToRoleId($role);
    }
}
