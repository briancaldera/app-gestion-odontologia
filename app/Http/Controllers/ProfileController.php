<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\UserResource;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use League\Flysystem\WhitespacePathNormalizer;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProfileController extends Controller
{

    const PROFILE_PICTURE_DIR = 'profiles/';

    public function index(Request $request)
    {
        /* @var User $user */
        $user = $request->user();
        if ($user->hasRole('admin')) {
            $users = User::with(['profile'])->get();

            return Inertia::render('Profiles/Index', [
                'users' => UserResource::collection($users),
            ]);
        }
        abort(403);
    }

    public function show(Request $request, Profile $profile)
    {
        /* @var User $user */
        $user = $request->user();

        $profile->load(['user']);

        if ($request->inertia()) {
            return Inertia::render('Profiles/Show',
                [
                    'profile' => new ProfileResource($profile),
                    'user' => $profile->user, // todo delete this
                ]
            );
        }

        return response()->json([
            'profile' => new ProfileResource($profile),
        ]);
    }

    public function create(): Response|RedirectResponse
    {
        /** @var User $user */
        $user = request()->user();
        if ($user->profile()->doesntExist()) {
            return Inertia::render('Auth/CreateProfile');
        }
        return redirect()->intended('dashboard');
    }

    public function store(StoreProfileRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        if ($user->profile()->exists()) {
            message('El perfil ya ha sido creado', \Type::Error);
            return back();
        }

        $data = $request->except(['picture']);

        /** @var Profile $profile */
        $profile = $user->profile()->create($data);

        // if picture file present, process it
        if ($request->hasFile('picture')) {
            $pictureFile = $request->file('picture');

            $profile->addMedia($pictureFile)->toMediaCollection('user-profile-picture');
        }

        message('Perfil de usuario creado exitosamente', \Type::Success);

        return to_route('dashboard');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $profile = $request->user()->profile;
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => [
                'nombres' => $profile->nombres,
                'apellidos' => $profile->apellidos,
                'fecha_nacimiento' => $profile->fecha_nacimiento,
                'telefono' => $profile->telefono,
                'direccion' => $profile->direccion,
                'sexo' => $profile->sexo,
                'cedula' => $profile->cedula,
                'picture_url' => $profile->picture_url,
            ]
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $request->user()->profile->update($data);

        message('Perfil actualizado exitosamente', \Type::Success);

        return Redirect::route('profile.edit');
    }

    public function updatePicture(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'picture' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'between:2, 1024'],
        ]);

        $profile = $request->user()->profile;

        $previousPicture = $profile->picture_url;

        if (is_null($data['picture'])) {
            $profile->picture_url = null;
        } else {
            $profilePic = $data['picture'];
            $profile->picture_url = $this->storeProfilePicture($profilePic);
        }

        $profile->save();

        if (!is_null($previousPicture)) {
            $filePath = Str::of($previousPicture)->remove('/storage/');
            Storage::disk('public')->delete($filePath);
        }

        message('Perfil actualizado exitosamente', \Type::Success);

        return to_route('profile.edit');
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

    public function getProfilePicture(Profile $profile, string $id)
    {
        $file = $profile->getMedia('user-profile-picture')->first(fn(Media $media) => $media->uuid === $id);

        if (isset($file)) {
            return response()->file($file->getPath());
        }

        return response(null, 404);
    }

    private function storeProfilePicture($file): string
    {
        // TODO: process image here...
        $now = now();
        return $file->storePublicly((new WhitespacePathNormalizer())->normalizePath(self::PROFILE_PICTURE_DIR . $now->year), 'public');
    }
}
