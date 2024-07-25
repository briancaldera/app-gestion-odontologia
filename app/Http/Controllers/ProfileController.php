<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\StoreProfileRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use League\Flysystem\WhitespacePathNormalizer;
use Nette\Utils\Image;

class ProfileController extends Controller
{

    const PROFILE_PICTURE_DIR = 'profiles/';

    public function create(): Response | RedirectResponse
    {
        if (!Auth::user()->profile) {
            return Inertia::render('Auth/CreateProfile');
        }
        return to_route('dashboard');
    }

    public function store(StoreProfileRequest $request): RedirectResponse
    {
        abort_if(isset($request->user()->profile), 400, "El perfil ya ha sido creado.");

        $data = $request->except(['picture']);

        // if picture file present, process it
        if ($request->hasFile('picture')) {
            $profilePic = $request->file('picture');

            // TODO: process image here...
            $now = now();

            $data["picture_url"] = $profilePic->storePublicly((new WhitespacePathNormalizer())->normalizePath(self::PROFILE_PICTURE_DIR . $now->year), 'public');
        }

        $request->user()->profile()->create($data);

        message('Usuario creado exitosamente', \Type::Success);

        return to_route('dashboard');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
