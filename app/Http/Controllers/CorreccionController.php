<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteCorreccionRequest;
use App\Http\Requests\StoreCorreccionRequest;
use App\Http\Requests\UpdateCorreccionRequest;
use App\Models\Correccion;
use App\Models\Historia;
use App\Services\CorreccionService;
use Inertia\Inertia;
use Inertia\Response;

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
    public function store(Historia $historia, StoreCorreccionRequest $request)
    {
        $data = $request->validated();
        $this->correccionService->addCorreccion($historia, $request->user()->id, $data['message']);
        return response(null, 201);
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
    public function update(Historia $historia, UpdateCorreccionRequest $request)
    {
        $data = $request->validated();
        $this->correccionService->updateCorreccion($historia, $data['correccion_id'], $data['message']);
        return response(null, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Historia $historia, DeleteCorreccionRequest $request)
    {
        $data = $request->validated();
        $this->correccionService->deleteCorreccion($historia, $data['correccion_id']);
        return response(null, 200);
    }
}
