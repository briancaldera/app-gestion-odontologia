<?php

namespace App\Http\Controllers;

use App\Models\Historia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeworkController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $historias = [];

        if ($user->hasPermission(['homeworks-index-all', 'homeworks-full-control'])) {
            $historias = Historia::whereJsonLength('shared_with', '>' , 0)->get();
        } else {
            $historias = Historia::whereJsonContains('shared_with', $user->id)->get();
        }


        return Inertia::render('Homeworks/Index', [
            'historias' => $historias,
        ]);
    }
}
