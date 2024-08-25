<?php

namespace App;

interface StatusHolder
{
    public function getStatus(): Status;
    public function setStatus(Status $status): void;
    public function isLocked(): bool;
    public function isOpen(): bool;
}
