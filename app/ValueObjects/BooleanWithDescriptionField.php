<?php

namespace App\ValueObjects;

use Illuminate\Contracts\Support\Arrayable;
use JsonSerializable;

class BooleanWithDescriptionField implements Arrayable, JsonSerializable
{
    private ?bool $status;
    private ?string $description;

    /**
     * @param bool|null $status
     * @param string|null $description
     */
    public function __construct(?bool $status, ?string $description)
    {
        $this->status = $status;
        $this->description = $description;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(?bool $status): void
    {
        $this->status = $status;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function toArray()
    {
        return [
            'status' => $this->status,
            'description' => $this->description,
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }
}
