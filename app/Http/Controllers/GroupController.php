<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidMemberException;
use App\Exceptions\MemberAlreadyExistsException;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\Group\AssignmentResource;
use App\Http\Resources\Odontologia\HistoriaResource;
use App\Http\Resources\PacienteResource;
use App\Http\Resources\UserResource;
use App\Models\Group;
use App\Models\Group\Assignment;
use App\Models\Historia;
use App\Models\Paciente;
use App\Models\User;
use App\Services\GroupService;
use App\Status;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
        /** @var User $user */
        $user = $request->user();
        $user->load(['group']);

        if ($user->cannot('viewAny', Group::class)) {
            message('No tienes permisos para ver grupos', \Type::Info);
            return back();
        }

        $tutors = User::with(['profile'])->whereHasPermission(['groups-add-corrections'])->get();

        $group_owners = Group::with(['owner'])->whereJsonContains('members', $user->id)->get()->map(fn(Group $group) => $group->owner);

        if ($user->hasPermission(['groups-index-all', 'groups-full-control'])) {


        return Inertia::render('Groups/Index', [
            'tutors' => UserResource::collection($tutors),
            'assigned_tutors' => UserResource::collection($group_owners),
        ]);
        } else {

            return to_route('groups.show', ['group' => $user->id]);
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
        $user = $request->user();

        if ($user->cannot('create', Group::class)) {
            message('No tienes permisos para crear grupos', \Type::Info);
            return back();
        }

        $data = $request->validated();
        $owner = User::find($data['owner']);
        $this->groupService->createGroup($data['name'], $owner);

        message('Grupo creado exitosamente', \Type::Success);
        return response(null, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, User $user)
    {

        $user->load(['profile', 'group']);

        if ($user->group()->doesntExist()) {
            $user->group()->create();
            $user->refresh();
        }

        /** @var Group $group */
        $group = $user->group;

        $students = User::with(['profile'])->whereHasRole(['estudiante'])->get();

        return Inertia::render('Groups/Show', [
            'user' => new UserResource($user),
            'students' => UserResource::collection($students),
        ]);
    }

    public function assign(Request $request, User $user)
    {
        $data = $request->validate([
           'users' => ['required', 'list'],
           'users.*' => ['exists:'. User::class.',id'],
        ]);

        $users = User::whereIn('id', collect($data['users']))->get();

        /** @var Group $group */
        $group = $user->group;

        $group->members = $group->members->union($users);
        $group->update();

        message('Alumnos asignados', \Type::Success);
        return response(null, 200);
    }

    public function clear(Request $request, User $user)
    {

    }

    public function showMember(Request $request, User $user, User $member)
    {
        $member->load(['profile']);

        $pacientes = Paciente::where('assigned_to', $member->id)->get();

        $historias = Historia::where('autor_id', $member->id)->get();

        return Inertia::render('Groups/Members/Show', [
            'member' => new UserResource($member),
            'pacientes' => PacienteResource::collection($pacientes),
            'historias' => HistoriaResource::collection($historias),
        ]);
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
        $user = $request->user();

        if ($user->cannot('addMember', $group)) {
            message('No puedes agregar miembros a este grupo', \Type::Info);
            return back();
        }

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
        $user = $request->user();

        if ($user->cannot('removeMember', $group)) {
            message('No puedes remover miembros de este grupo', \Type::Info);
            return back();
        }

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

    public function showAssignment(Group $group, Group\Assignment $assignment)
    {
        /** @var User $user */
        $user = auth()->user();
        $assignment->load(['homeworks']);

        if ($user->hasPermission('homeworks-create')) {
            $historias = $user->historias()->with(['paciente'])->get()->reject(fn (Historia $historia) => $historia->isLocked());
        } else {
            $historias = [];
        }

        return Inertia::render('Groups/Assignments/Show', [
            'assignment' => new AssignmentResource($assignment),
            'historias' => HistoriaResource::collection($historias),
        ]);
    }

    public function storeAssignment(Group $group, Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:10000'],
        ]);

        $this->groupService->addAssignment($group, $data);

        message('Asignación creada exitosamente', \Type::Success);
        return response(null, 200);
    }

    public function storeHomework(Group $group, Group\Assignment $assignment, Request $request)
    {
        $data = $request->validate([
            'documents' => ['required', 'min:1', 'max:1'],
            'documents.*' => ['array:id,type'],
            'documents.*.id' => ['required', 'required', 'string'],
            'documents.*.type' => ['required', 'string'],
        ]);

        /** @var User $user */
        $user = $request->user();
        $documents = collect($data['documents']);

        $hra = $documents->filter(fn ($document) => $document['type'] === 'HRA');

        if ($hra->count() > 0) {
            // get ids
            $HRA_ids = $hra->pluck('id');

            // Query database for Historias with given ID
            /** @var Collection<Historia> $historias_regulares_adulto */
            $historias_regulares_adulto = Historia::whereIn('id', $HRA_ids)->get();

            // check each HCE to belong to the current user, so user could not turn in other's HCEs
            // also check the HCE is open, so users can only turn in open HCEs
            $historias_regulares_adulto->each(function (Historia $hce) use ($user) {
                if ($hce->autor_id !== $user->id) throw new \Exception('No puede entregar la historia de otro usuario como tarea propia');
                if ($hce->isLocked()) throw new \Exception('No puede entregar una historia que ya se encuentra cerrada o entregada');
            });

            // set status to ENTREGADA (turned in)
            $historias_regulares_adulto->each(fn (Historia $historia) => $historia->setStatus(Status::ENTREGADA));

            $docs = $historias_regulares_adulto->map(fn (Historia $historia) => [
                'id' => $historia->id,
                'type' => 'HRA',
                'corrections' => [
                    'sections' => null,
                ],
            ])->toArray();

            $data = [
                'documents' => $docs,
            ];

            $this->groupService->addHomeworkToAssignment($assignment, $data);
        }

        message('Tarea entregada exitosamente', \Type::Success);
        message('Recibiras una notificación si tu docente deja correcciones', \Type::Info);
        return response(null, 200);
    }

    public function addCorrectionsToDocument(Group $group, Assignment $assignment, Group\Homework $homework, Request $request)
    {
        $data = $request->validate([
            'document_id' => ['required', 'string'],
            'type' => ['required', 'string', Rule::in(['HRA'])],
            'section' => ['required', 'string'],
            'content' => ['required', 'string', 'max:1000']
        ]);

        $this->groupService->addCorrectionsToDocument($homework, $data);
        message('Correcciones agregadas', \Type::Success);
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
