<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Models\Role;
use App\Models\User;
use App\Models\UserCode;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'size' => ['sometimes', 'integer', Rule::in(['10', '25', '50', '100'])],
            ]);

        $page_size = $data['size'] ?? 10;

        $users_paginator = User::with(['profile'])->paginate($page_size)->withQueryString();;

        return Inertia::render('Users/Index', [
            'users' => new UserCollection($users_paginator),
        ]);
    }

    public function indexCodes(Request $request)
    {
        if ($request->user()->cannot('viewAny', UserCode::class)) {
            message('No tienes permisos para acceder a esta sección', \Type::Error);
            return back();
        }

        $codes = UserCode::with(['role:id,name,display_name,description'])->get()->map(fn(UserCode $userCode) => [
            'id' => $userCode->id,
            'code' => $userCode->code,
            'role' => $userCode->role->only(['name', 'display_name', 'description']),
            'user_id' => $userCode->user_id,
            'created_at' => $userCode->created_at,
            'updated_at' => $userCode->updated_at,
        ]);

        return Inertia::render('UserCodes/Index', [
            'userCodes' => $codes,
        ]);
    }

    public function storeCode(Request $request)
    {
        if ($request->user()->cannot('create', UserCode::class)) {
            message('no tienes permisos para crear códigos', \Type::Error);
            return back();
        }

        $data = $request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:' . UserCode::class . ',code',],
            'role' => ['required', 'exists:' . Role::class . ',name',],
        ]);

        $role = Role::where('name', $data['role'])->first();

        $userCode = new UserCode();
        $userCode->code = $data['code'];
        $userCode->role_id = $role->id;
        $userCode->save();

        message('Expediente agregado', \Type::Success);
        return response(null, 200);
    }

    public function updateCode(UserCode $userCode, Request $request)
    {
        if ($request->user()->cannot('update', $userCode)) {
            message('No tienes permisos para actualizar códigos', \Type::Error);
            return back();
        }

        if ($userCode->user()->exists()) {
            message('No puedes cambiar el código o rol inicial de un usuario existente', \Type::Error);
            return back();
        }

        $data = $request->validate([
            'code' => ['required', 'string', 'max:255'],
            'role' => ['required', 'exists:' . Role::class . ',name',],
        ]);

        $role = Role::where('name', $data['role'])->first();

        $userCode->code = $data['code'];
        $userCode->role_id = $role->id;
        $userCode->update();

        message('Expediente actualizado', \Type::Success);
        return response(null, 200);
    }

    public function destroyCode(UserCode $userCode, Request $request)
    {
        if ($request->user()->cannot('delete', $userCode)) {
            message('No tienes permisos para eliminar códigos', \Type::Error);
            return back();
        }

        if ($userCode->user()->exists()) {
            message('No puede eliminar el expediente de un usuario existente', \Type::Error);
            return back();
        }

        $userCode->delete();

        message('Expediente eliminado', \Type::Success);
        return response(null, 200);
    }
}
