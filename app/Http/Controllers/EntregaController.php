<?php

namespace App\Http\Controllers;

use App\Models\Entrega;
use App\Models\Historia;
use App\Models\User;
use Illuminate\Http\Request;

class EntregaController extends Controller
{
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
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:'.User::class,',id'],
            'historia_id' => ['required', 'exists:'.Historia::class,',id'],
        ]);

        $user = $request->user();

        $entrega = new Entrega();
        $entrega->historia_id = $data['historia_id'];
        $entrega->user_id = $data['user_id'];
        $entrega->author_id = $user->id;

        $entrega->save();

        message('Entrega guardada');
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Entrega $entrega)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entrega $entrega)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Entrega $entrega)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entrega $entrega)
    {
        //
    }
}
