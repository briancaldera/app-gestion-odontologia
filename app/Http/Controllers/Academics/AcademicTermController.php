<?php

namespace App\Http\Controllers\Academics;

use App\Http\Controllers\Controller;
use App\Http\Resources\AcademicTermResource;
use App\Models\AcademicTerm;
use App\Services\AcademicService;
use Illuminate\Http\Request;

class AcademicTermController extends Controller
{
    public function __construct(protected AcademicService $academicService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $academicTerms = AcademicTerm::all();
        return AcademicTermResource::collection($academicTerms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:255', 'unique:' . AcademicTerm::class],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        $this->academicService->createAcademicTerm($data);

        message('Periodo académico creado exitosamente', \Type::Success);
        return response(null, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademicTerm $academicTerm)
    {
        return new AcademicTermResource($academicTerm);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AcademicTerm $academicTerm)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'code' => ['sometimes', 'string', 'max:255', 'unique:' . AcademicTerm::class . ',code,' . $academicTerm->id],
            'start_date' => ['sometimes', 'date'],
            'end_date' => ['sometimes', 'date', 'after:start_date'],
        ]);

        $this->academicService->updateAcademicTerm($academicTerm->id, $data);

        message('Periodo académico actualizado exitosamente', \Type::Success);
        return response(null, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademicTerm $academicTerm)
    {
        $this->academicService->deleteAcademicTerm($academicTerm->id);

        message('Periodo académico eliminado exitosamente', \Type::Success);
        return response(null, 200);
    }
}
