<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidMemberException;
use App\Exceptions\MemberAlreadyExistsException;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\GroupResource;
use App\Http\Resources\UserResource;
use App\Models\Group;
use App\Models\User;
use App\Services\GroupService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function __construct(protected GroupService $groupService)
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            $groups = Group::with(['owner.profile'])->get();

            $profesores = User::whereHasRole('profesor')->get();
            return Inertia::render('Admin/Groups/Index', [
                'groups' => GroupResource::collection($groups),
                'profesores' => UserResource::collection($profesores),
            ]);
        } elseif ($user->hasRole('estudiante')) {

            $groups = $user->groups()->load(['owner.profile'])->makeVisible('owner');
            $groups->each(fn (Group $group) => $group->owner->makeVisible('profile'));
            return Inertia::render('Estudiante/Groups/Index', [
                'groups' => GroupResource::collection($groups),
            ]);
        }
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
    public function store(StoreGroupRequest $request)
    {
        $data = $request->validated();
        $owner = User::find($data['owner']);
        $this->groupService->createGroup($data['name'], $owner);
        return response(null, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group, Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {

            $group->owner->profile;
            $group->members->each(fn (User $user) => $user->profile);

            $students = User::whereHasRole('estudiante')->with('profile')->get()->reject(fn (User $user) => $group->members->contains('id', $user->id));

            return Inertia::render('Admin/Groups/Show', [
                'group' => new GroupResource($group),
                'students' => UserResource::collection($students),
            ]);
        } elseif ($user->hasRole('estudiante')) {

            $group->owner->profile;
            $group->owner->makeVisible(['profile']);
            $group->owner->profile->makeVisible(['nombres', 'apellidos']);

            $historias = $user->historias()->where('status', 'abierta')->orWhere('status', 'correccion')->with(['paciente'])->get();

            return Inertia::render('Estudiante/Groups/Show', [
                'group' => new GroupResource($group),
                'historias' => $historias,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Group $group)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGroupRequest $request, Group $group)
    {

    }

    public function addMembers(Group $group, Request $request)
    {
        $data = $request->validate([
            'group_id' => ['required', 'ulid', 'exists:' . Group::class . ',id'],
            'new_members' => ['required', 'array'],
            'new_members.*' => ['required', 'uuid', 'exists:' . User::class . ',id'],
        ]);

        $new_members_id = collect($data['new_members']);

        $new_members = $new_members_id->map(fn(string $id) => User::findOrFail($id));

        try {
            $new_members->each(fn(User $member) => $this->groupService->addMember($group, $member));
        } catch (MemberAlreadyExistsException $e) {
            report($e);
            return response("Member already exists", 400);
        }
        message('Miembros agregados al grupo exitosamente', \Type::Success);
        return response(null, 200);
    }

    public function removeMembers(Group $group, Request $request)
    {
        $data = $request->validate([
            'group_id' => ['required', 'ulid', 'exists:' . Group::class . ',id'],
            'members' => ['required', 'array'],
            'members.*' => ['required', 'uuid', 'exists:' . User::class . ',id'],
        ]);

        $members = collect($data['members'])->map(fn (string $id) => User::findOrFail($id));

        try {
            $members->each(fn (User $member) => $this->groupService->removeMember($group, $member));
        } catch (InvalidMemberException $e) {
            report($e);
            return response('Invalid member', 400);
        }
        message('Miembros removidos del grupo exitosamente', \Type::Success);
        return response(null, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        $this->groupService->deleteGroup($group);
        message('Grupo eliminado exitosamente', \Type::Success);
        return response(null, 200);
    }
}
