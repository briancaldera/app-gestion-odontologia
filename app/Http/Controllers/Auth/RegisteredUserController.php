<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\UserCode;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse | \Illuminate\Http\Response
    {
        $body = $request->validate([
            'code' => ['required', 'string', 'max:255'],
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // todo check usercode here

        if (!UserCode::where('code', $body['code'])->exists()) {
            message('Número de expediente no existe en el sistema. No está autorizado para registrarse', \Type::Warning);
            message('Debe ponerse en contacto con la coordinación o administración de su facultad', \Type::Info);
            return response(null, 403);
        }

        /** @var User $user */
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        /** @var UserCode $code */
        $code = UserCode::where('code', $body['code'])->first();
        $code->user_id = $user->id;
        $code->save();

        // devuelve el modelo del Role para asignar al usuario
        $role = Role::find($code->role_id);

        // asigna el role indicado por el expediente al usuario
        $user->addRole($role);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
