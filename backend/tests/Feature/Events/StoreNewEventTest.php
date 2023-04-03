<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Organization;

class StoreNewEventTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test storing new event
     *
     * @return void
     */
    public function test_storing_new_event()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        // event data
        $eventData["title"] = "My New Event";
        $eventData["description"] = "This is new event's description.";
        $eventData["latitude"] = 55;
        $eventData["longitude"] = 54;

        $response = $this->post('/api/events', $eventData, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Stored successfuly'
        ]);
        
    }

    /**
     * Test storing new event hosted by organization
     *
     * @return void
     */
    public function test_storing_new_event_hosted_by_organization()
    {
        $user = User::factory()
            ->has(Organization::factory()->count(2), 'organisations')
            ->create();

        $organization = $user->organisations()->first();

        $csrfToken = $this->login($user->toArray());

        // event data
        $eventData["title"] = "My New Event";
        $eventData["description"] = "This is new event's description.";
        $eventData["latitude"] = 55;
        $eventData["longitude"] = 54;
        $eventData["organization_id"] = $organization->id;

        $response = $this->post('/api/events', $eventData, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Stored successfuly'
        ]);
        
    }

    /**
     * Test validation mesdsage when storing new event hosted by organization
     *
     * @return void
     */
    public function test_validation_when_storing_new_event_hosted_by_organization()
    {
        $user = User::factory()
            ->has(Organization::factory()->count(2), 'organisations')
            ->create();

        $organization = $user->organisations()->first();

        $userTwo = User::factory()
            ->has(Organization::factory()->count(2), 'organisations')
            ->create();

        $someoneElsesOrganization = $userTwo->organisations()->first();

        $csrfToken = $this->login($user->toArray());

        // event data
        $eventData["title"] = "My New Event";
        $eventData["description"] = "This is new event's description.";
        $eventData["latitude"] = 55;
        $eventData["longitude"] = 54;
        $eventData["organization_id"] = $someoneElsesOrganization->id;

        $response = $this->post('/api/events', $eventData, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(403);
        $response->assertJson([
            'message' => 'Unauthorized action.'
        ]);
        
    }

    /**
     * Test validation messages
     *
     * @return void
     */
    public function test_validation_messages()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        // event data
        $eventData["title"] = "My New Event";
        $eventData["description"] = null;
        $eventData["latitude"] = "something";
        $eventData["longitude"] = 54;

        $response = $this->post('/api/events', $eventData, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(422)
         ->assertJson([
            'message' => 'The description field is required. (and 1 more error)',
            'errors' => [
                'description' => [
                    'The description field is required.'
                ],
                'latitude' => [
                    'The latitude field must be a number.'
                ]
            ]
         ]);
        
    }

    /**
     * Test un-authenticated request to storing a new event
     *
     * @return void
     */
    public function test_unauthenticated_request()
    {
        $userData = User::factory()->create()->toArray();

        // no login

        // event data
        $eventData["title"] = "My New Event";
        $eventData["description"] = "This is new event's description.";
        $eventData["latitude"] = 55;
        $eventData["longitude"] = 54;

        $response = $this->post('/api/events', $eventData, [
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(401);
        
    }

    private function login(array $userData): string
    {
        $response = $this->get('/sanctum/csrf-cookie');

        $csrfToken = $response->cookie('XSRF-TOKEN');

        $headers = [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ];

        $loginData = [
            'email' => $userData['email'],
            'password' => 'password',
        ];

        $response = $this->post('/login', $loginData, $headers);

        return $response->cookie('XSRF-TOKEN');
    }

}