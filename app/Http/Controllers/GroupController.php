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

class GroupController extends Controller
{
    public function __construct(protected GroupService $groupService)
    {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

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
        return response(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        //
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

    public function addMember(Group $group, Request $request)
    {
        $data = $request->validate([
            'new_member' => ['required', 'uuid', 'exists:' . User::class . ',id'],
        ]);

        $newMember = User::find($data['new_member']);

        try {
            $this->groupService->addMember($group, $newMember);
        } catch (MemberAlreadyExistsException $e) {
            report($e);
            return response('Member already exists', 400);
        }
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
