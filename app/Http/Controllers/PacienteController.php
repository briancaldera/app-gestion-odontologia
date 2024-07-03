<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePacienteRequest;
use App\Models\Paciente;
use App\Services\PacienteService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PacienteController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected PacienteService $pacienteService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePacienteRequest $request)
    {
        $validated = $request->validated();
        $this->pacienteService->storePaciente($validated);
        return response('OK', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paciente $paciente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paciente $paciente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paciente $paciente)
    {
        //
    }
}
