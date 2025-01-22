<?php

namespace App\Http\Controllers;

use App\Http\Resources\AcademicTermResource;
use App\Services\AcademicService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function __construct(protected AcademicService $academicService)
    {}

    public function dashboard(Request $request)
    {
        $acadTerms = $this->academicService->getAllAcademicTerms();
        return Inertia::render('Escuela/Dashboard', [
            'academicTerms' => AcademicTermResource::collection($acadTerms),
        ]);
    }
}
