<?php

namespace App;

enum Roles: string
{
    case ESTUDIANTE = 'estudiante';
    case PROFESOR = 'profesor';
    case ADMISION = 'admision';
    case ADMIN = 'admin';
}
