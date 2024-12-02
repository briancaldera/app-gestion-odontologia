<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\UserCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
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
            return response(null, 400);
        }

        $userCode->delete();

        message('Expediente eliminado', \Type::Success);
        return response(null, 200);
    }
}
