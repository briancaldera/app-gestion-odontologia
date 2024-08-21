<?php

namespace App\Exceptions;

use Exception;

class MemberAlreadyExistsException extends Exception
{
    /**
     * Report the exception.
     */
    public function report(): void
    {
        //
    }
}
