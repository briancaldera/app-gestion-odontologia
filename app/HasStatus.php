<?php

namespace App;

trait HasStatus
{
    protected string $column_key = 'status';

    public function getStatus(): Status {
        return $this->getAttributeValue($this->column_key);
    }

    public function setStatus(Status $status): void {
        $this->setAttribute($this->column_key, $status);
        $this->saveOrFail();
    }

    public function isLocked(): bool {
        return $this->getAttributeValue($this->column_key) === Status::ENTREGADA OR
            $this->getAttributeValue($this->column_key) === Status::CERRADA;
    }

    public function isOpen(): bool {
        return $this->getAttributeValue($this->column_key) === Status::ABIERTA OR
            $this->getAttributeValue($this->column_key) === Status::CORRECCION;
    }

    public function hasStatus(string $status): bool
    {
        return $this->getAttributeValue($this->column_key) === $status;
    }
}
