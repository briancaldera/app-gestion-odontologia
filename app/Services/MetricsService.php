<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Collection;

interface MetricsService
{
    public function getMetrics(): Collection;
    public function getMetricsForUser(User $user): Collection;
}
