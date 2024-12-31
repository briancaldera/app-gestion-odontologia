<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Services\MetricsService;
use Illuminate\Http\Request;

class MetricsController extends Controller
{
    public function __construct(protected MetricsService $metricsService)
    {}

    public function getMetrics(Request $request)
    {
        $metrics = $this->metricsService->getMetrics();

        return response()->json($metrics);
    }
}
