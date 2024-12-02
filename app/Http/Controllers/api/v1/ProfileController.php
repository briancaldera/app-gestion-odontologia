<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {

        if ($request->has('role')) {

            $data = $request->validate([
                'role' => 'exists:'.Role::class.',name'
            ]);

            $res = User::whereHasRole($data['role'])->with(['profile'])->get();

            $profiles = $res->map(fn(User $user) => $user->profile);

            return ProfileResource::collection($profiles);
        }

        $res = Profile::with(['user'])->get();

        return ProfileResource::collection($res);
    }

    public function show(Profile $profile)
    {
        return new ProfileResource($profile);
    }
}
