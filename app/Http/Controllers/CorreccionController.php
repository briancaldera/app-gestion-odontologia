<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteCorreccionRequest;
use App\Http\Requests\StoreCorreccionRequest;
use App\Http\Requests\UpdateCorreccionRequest;
use App\Models\Correccion;
use App\Models\Historia;
use App\Services\CorreccionService;

class CorreccionController extends Controller
{
    public function __construct(protected CorreccionService $correccionService)
    {}
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
    public function store(StoreCorreccionRequest $request)
    {
        $data = $request->validated();
        $this->correccionService->addCorreccion($data['historia_id'], $request->user()->id, $data['message']);
        return redirect()->refresh(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Correccion $correccion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Correccion $correccion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCorreccionRequest $request)
    {
        $data = $request->validated();
        $this->correccionService->updateCorreccion($data['historia_id'], $data['correccion_id'], $data['message']);
        return redirect()->refresh(303);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteCorreccionRequest $request)
    {
        $data = $request->validated();
        $this->correccionService->deleteCorreccion($data['historia_id'], $data['correccion_id']);
        return redirect()->refresh(303);
    }
}
