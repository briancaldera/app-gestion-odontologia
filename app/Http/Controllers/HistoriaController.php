<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHistoriaRequest;
use App\Http\Requests\UpdateHistoriaRequest;
use App\Models\Historia;
use App\Models\Paciente;
use App\Services\HistoriaService;

class HistoriaController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected HistoriaService $historiaService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreHistoriaRequest $request, Paciente $paciente)
    {
        $data = $request->validated();
        $this->historiaService->addHistoria($paciente, $data);
        return response(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Historia $historia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Historia $historia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHistoriaRequest $request, Historia $historia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Historia $historia)
    {
        //
    }
}
