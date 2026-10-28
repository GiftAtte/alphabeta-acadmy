<?php

use App\Models\Certificate;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\Student;
use App\Models\Training;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->withoutVite();
    $this->admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($this->admin);
});

function makeTraining(array $o = []): Training
{
    return Training::create(array_merge([
        'name' => 'Welding 101', 'code' => 'WLD-' . Str::random(5), 'duration' => '40',
        'price' => 100, 'status' => 'active', 'category' => 'Trade', 'level' => 'beginner',
    ], $o));
}

function makeStudent(array $o = []): Student
{
    return Student::create(array_merge([
        'first_name' => 'Ada', 'last_name' => 'Lovelace', 'email' => Str::random(6) . '@x.com',
    ], $o));
}

test('non admins are blocked from admin routes', function () {
    $this->actingAs(User::factory()->create(['role' => 'user']));
    $this->getJson('/admin/trainings')->assertForbidden();
});

test('all admin listing and create pages render', function () {
    $t = makeTraining();
    $s = makeStudent();
    foreach ([
        '/admin/dashboard', '/admin/leads', '/admin/contacts', '/admin/users', '/admin/students',
        '/admin/students/create', "/admin/students/{$s->id}", "/admin/students/{$s->id}/edit",
        '/admin/trainings', '/admin/trainings/create', "/admin/trainings/{$t->id}", "/admin/trainings/{$t->id}/edit",
        '/admin/certificates', '/admin/certificates/create', '/admin/enrollments', '/admin/enrollments/create',
        '/admin/analytics/site-visits', '/admin/students-dropdown', '/admin/trainings-dropdown',
    ] as $url) {
        $this->get($url)->assertOk();
    }
});

test('training crud as the modal does it', function () {
    // create: duration arrives as a string, price as number, extra modal fields ignored
    $payload = ['name' => 'Plumbing', 'code' => 'PLB-1', 'description' => 'd', 'category' => 'Trade',
        'duration' => '40', 'price' => 250.5, 'status' => 'active', 'max_students' => 10, 'start_date' => ''];
    $id = $this->postJson('/admin/trainings', $payload)->assertCreated()->json('training.id');

    $this->postJson('/admin/trainings', $payload)->assertStatus(422)->assertJsonValidationErrors('code');
    $this->postJson('/admin/trainings', ['name' => ''])->assertStatus(422);

    $payload['name'] = 'Plumbing Pro';
    $this->putJson("/admin/trainings/{$id}", $payload)->assertOk();
    expect(Training::find($id)->name)->toBe('Plumbing Pro');
    $this->putJson("/admin/trainings/{$id}", ['name' => ''] + $payload)->assertStatus(422);

    // list page must expose description so the edit modal does not blank it
    $this->get('/admin/trainings')->assertInertia(fn ($p) => $p->has('trainings.data.0.description'));

    $this->deleteJson("/admin/trainings/{$id}")->assertOk();
    expect(Training::find($id))->toBeNull();
});

test('student crud', function () {
    $p = ['first_name' => 'Grace', 'last_name' => 'Hopper', 'email' => 'g@h.com', 'phone' => '123',
        'gender' => 'female', 'status' => 'active', 'date_of_birth' => '2000-01-01', 'registration_date' => '2024-01-01'];
    $this->postJson('/admin/students', $p)->assertSuccessful();
    $student = Student::where('email', 'g@h.com')->firstOrFail();

    $this->postJson('/admin/students', $p)->assertStatus(422);

    $this->putJson("/admin/students/{$student->id}", ['last_name' => 'Murray'] + $p)->assertSuccessful();
    expect($student->fresh()->last_name)->toBe('Murray');

    // Inertia style (useForm)
    $this->put("/admin/students/{$student->id}", ['last_name' => 'Z'] + $p, ['X-Inertia' => 'true'])->assertStatus(303);

    $this->deleteJson("/admin/students/{$student->id}")->assertSuccessful();
    expect(Student::find($student->id))->toBeNull();
});

test('user crud', function () {
    $p = ['name' => 'New User', 'email' => 'nu@x.com', 'password' => 'Str0ng!Passw0rd', 'password_confirmation' => 'Str0ng!Passw0rd', 'role' => 'user'];
    $this->post('/admin/users', $p)->assertSessionHasNoErrors();
    $u = User::where('email', 'nu@x.com')->firstOrFail();

    $this->post('/admin/users', $p)->assertSessionHasErrors('email');

    $this->put("/admin/users/{$u->id}", ['name' => 'Renamed', 'email' => 'nu@x.com', 'role' => 'admin'])->assertSessionHasNoErrors();
    expect($u->fresh()->name)->toBe('Renamed');
    $this->put("/admin/users/{$u->id}", ['name' => 'R', 'email' => 'nu@x.com', 'role' => 'admin', 'password' => 'Newer!Passw0rd99', 'password_confirmation' => 'Newer!Passw0rd99'])->assertSessionHasNoErrors();

    $this->delete("/admin/users/{$u->id}")->assertSessionHasNoErrors();
    expect(User::find($u->id))->toBeNull();
});

test('lead crud', function () {
    $t = makeTraining();
    $this->postJson('/admin/leads', ['name' => 'L', 'email' => 'l@x.com', 'training_id' => $t->id, 'message' => 'hi'])->assertSuccessful();
    $lead = Lead::firstOrFail();
    // the leads page uses Inertia useForm, so updates redirect back
    $this->put("/admin/leads/{$lead->id}", ['status' => 'contacted', 'notes' => 'called'], ['X-Inertia' => 'true'])->assertRedirect();
    expect($lead->fresh()->status)->toBe('contacted');
    $this->put("/admin/leads/{$lead->id}", ['status' => 'bogus'], ['X-Inertia' => 'true'])->assertSessionHasErrors('status');
    $this->deleteJson("/admin/leads/{$lead->id}")->assertSuccessful();
    expect(Lead::count())->toBe(0);
});

test('certificate crud', function () {
    $t = makeTraining();
    $s = makeStudent();
    $p = ['certificate_number' => 'CERT-1', 'student_id' => $s->id, 'training_id' => $t->id,
        'issue_date' => '2024-01-01', 'expiry_date' => '2026-01-01', 'status' => 'active', 'grade' => 'A', 'notes' => 'n'];
    $this->postJson('/admin/certificates', $p)->assertSuccessful();
    $c = Certificate::firstOrFail();
    $this->postJson('/admin/certificates', $p)->assertStatus(422);

    $this->putJson("/admin/certificates/{$c->id}", ['grade' => 'B'] + $p)->assertSuccessful();
    expect($c->fresh()->grade)->toBe('B');

    $this->postJson('/verify-certificate', ['certificate_number' => 'CERT-1'])->assertSuccessful();

    $this->deleteJson("/admin/certificates/{$c->id}")->assertSuccessful();
    expect(Certificate::count())->toBe(0);
});

test('enrollment crud', function () {
    $t = makeTraining();
    $s = makeStudent();
    $p = ['student_id' => $s->id, 'training_id' => $t->id, 'enrollment_date' => '2024-01-01',
        'status' => 'enrolled', 'payment_status' => 'pending'];
    $this->postJson('/admin/enrollments', $p)->assertSuccessful();
    $id = DB::table('student_training')->value('id');

    $this->getJson("/admin/enrollments/{$id}")->assertSuccessful();
    $this->putJson("/admin/enrollments/{$id}", ['status' => 'completed', 'payment_status' => 'paid', 'enrollment_date' => '2024-01-01', 'completion_date' => '2024-02-01'])->assertSuccessful();
    expect(DB::table('student_training')->where('id', $id)->value('status'))->toBe('completed');
    $this->putJson("/admin/enrollments/{$id}", ['status' => 'nope', 'payment_status' => 'paid'])->assertStatus(422);

    $this->deleteJson("/admin/enrollments/{$id}")->assertSuccessful();
    expect(DB::table('student_training')->count())->toBe(0);
});

test('contacts: public submit, admin view and reply', function () {
    $this->postJson('/api/contacts', ['name' => 'C', 'email' => 'c@x.com', 'subject' => 's', 'message' => 'm'])->assertSuccessful();
    $contact = Contact::firstOrFail();
    $this->get("/admin/contacts/{$contact->id}")->assertOk();
    $this->post("/admin/contacts/{$contact->id}/reply", ['reply' => 'thanks'])->assertSessionHasNoErrors();
});

test('public endpoints work', function () {
    $t = makeTraining();
    $this->getJson('/api/trainings')->assertOk();
    $this->getJson('/api/students')->assertOk();
    $this->postJson('/api/leads', ['name' => 'P', 'email' => 'p@x.com', 'training_id' => $t->id])->assertSuccessful();
});
