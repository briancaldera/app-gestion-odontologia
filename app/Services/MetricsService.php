<?php

namespace App\Services;

use Illuminate\Support\Collection;

interface MetricsService
{
    public function getMetrics(): Collection;
}
