<?php

use App\Http\Middleware\EnsureUserHasProfile;
use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
    $this->withoutMiddleware([EnsureUserHasProfile::class]);
});

test('Admin can create group', function () {
    // Arrange
    /* @var User $admin */
    $admin = User::factory()->createOne(['role' => 0]);

    /* @var User $profesor */
    $profesor = User::factory()->createOne(['role' => 2]);
    $name = 'Example group';

    // Act
    $response = $this->actingAs($admin)->postJson(route('groups.store'),
        [
            'name' => $name,
            'owner' => $profesor->id
        ]);

    // Assert
    $response->assertCreated();
    $this->assertDatabaseCount(Group::class, 1);
    expect(Group::all()[0]->owner)->toEqual($profesor->id)->and(Group::all()[0]->name)->toEqual($name);
});

test('Estudiante cannot create group', function () {
    // Arrange
    /* @var User $estudiante */
    $estudiante = User::factory()->createOne(['role' => 3]);

    /* @var User $profesor */
    $profesor = User::factory()->createOne(['role' => 2]);
    $name = 'Example group';

    // Act
    $response = $this->actingAs($estudiante)->postJson(route('groups.store'),
        [
            'name' => $name,
            'owner' => $profesor->id
        ]);

    // Assert
    $response->assertForbidden();
    $this->assertDatabaseCount(Group::class, 0);
});

test('Can add member to group', function () {
    // Arrange
    /* @var User $admin */
    $admin = User::factory()->createOne(['role' => 0]);

    /* @var User $profesor */
    $profesor = User::factory()->createOne(['role' => 2]);
    $name = 'Example group';

    /* @var Group $group */
    $group = Group::factory()->createOne(['owner' => $profesor->id, 'members' => collect([$profesor])]);

    $this->assertDatabaseCount(Group::class, 1);

    /* @var User $new_member */
    $new_member = User::factory()->createOne(['role' => 3]);

    // Act
    $res = $this->actingAs($admin)->patchJson(route('groups.addMember', ['group' => $group->id]),
        [
            'new_member' => $new_member->id
        ]
    );

    $group->refresh();

    // Assert
    $res->assertOk();
    expect($group->members)->toHaveLength(2)
        ->and($group->members->contains('id', $profesor->id))->toBeTrue()
        ->and($group->members->contains('id', $new_member->id))->toBeTrue();
});

test('Can remove member from group', function () {
    // Arrange
    /* @var User $admin */
    $admin = User::factory()->createOne(['role' => 0]);

    /* @var User $profesor */
    $profesor = User::factory()->createOne(['role' => 2]);
    $name = 'Example group';

    /* @var Collection<User> $members */
    $members = User::factory()->count(4)->create(['role' => 3]);
    $members->add($profesor);

    /* @var Group $group */
    $group = Group::factory()->createOne(['owner' => $profesor->id, 'members' => $members]);

    /* @var User $member_to_remove */
    $member_to_remove = $members[0];

    $group->refresh();
    expect($group->members)->toHaveLength(5);

    // Act
    $res = $this->actingAs($admin)->deleteJson(route('groups.removeMember', ['group' => $group->id]),
        [
            'member' => $member_to_remove->id
        ]
    );

    $group->refresh();

    // Assert
    $res->assertOk();

    expect($group->members)->toHaveLength(4)->and($group->members->contains('id', $member_to_remove->id))->toBeFalse()->and($group->members->contains('id', $members[2]->id))->toBeTrue();
});
