<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidMemberException;
use App\Exceptions\MemberAlreadyExistsException;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
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

        if ($user->isAdmin()) {
            $groups = Group::with(['owner.profile'])->get();

            $profesores = User::where('role', '2')->get();
            return Inertia::render('Admin/Groups/Index', [
                'groups' => $groups,
                'profesores' => $profesores
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

        if ($user->isAdmin()) {

            $group->owner->profile;
            $group->members->each(fn (User $user) => $user->profile);

            $students = User::where('role', '3')->with('profile')->get()->reject(fn (User $user) => $group->members->contains('id', $user->id));

            return Inertia::render('Admin/Groups/Show', [
                'group' => $group,
                'students' => $students,
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

    public function removeMember(Group $group, Request $request)
    {
        $data = $request->validate([
            'member' => ['required', 'uuid', 'exists:' . User::class . ',id'],
        ]);

        $member = User::find($data['member']);

        try {
            $this->groupService->removeMember($group, $member);
        } catch (InvalidMemberException $e) {
            report($e);
            return response('Invalid member', 400);
        }
        return response(null, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        $this->groupService->deleteGroup($group);
        return response(null, 200);
    }
}
