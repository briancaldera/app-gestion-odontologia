<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\UserCode;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function indexCodes(Request $request)
    {
        $codes = UserCode::with(['role:id,name,display_name,description'])->get()->map(fn(UserCode $userCode) => [
            'id' => $userCode->id,
            'code' => $userCode->code,
            'role' => $userCode->role->only(['name', 'display_name', 'description']),
            'user_id' => $userCode->user_id,
            'created_at' => $userCode->created_at,
            'updated_at' => $userCode->updated_at,
        ]);

        if (!$request->inertia() AND $request->expectsJson()) {
            return response()->json([
                'userCodes' => $codes,
            ]);
        }

        return Inertia::render('UserCodes/Show', [
            'userCodes' => $codes,
        ]);
    }

    public function storeCode(Request $request)
    {
        $data = $request->validate([
            'code' => ['required', 'string', 'max:255'],
            'role' => ['required', Rule::in(['admin', 'admision', 'profesor', 'estudiante'])],
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
        $data = $request->validate([
            'code' => ['required', 'string', 'max:255'],
            'role' => ['required', Rule::in(['admin', 'admision', 'profesor', 'estudiante'])],
        ]);

        $role = Role::where('name', $data['role'])->first();

        $userCode->code = $data['code'];
        $userCode->role_id = $role->id;
        $userCode->save();

        message('Expediente actualizado', \Type::Success);
        return response(null, 200);
    }

    public function destroyCode(UserCode $userCode, Request $request)
    {
        if ($userCode->user()->exists()) {
            message('No puede eliminar el expediente de un usuario existente', \Type::Error);
            return response(null, 400);
        }

        $userCode->delete();

        message('Expediente eliminado', \Type::Success);
        return response(null, 200);
    }
}
