<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use Illuminate\Support\Facades\Hash;

class UpdateEventTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test updating event
     *
     * @return void
     */
    public function test_updating_event()
    {
        $userData = User::factory()
                        ->has(Event::factory()->count(1), 'hostingEvents')
                        ->create();

        $event = $userData->hostingEvents()->get()->first();

        $csrfToken = $this->login($userData->toArray());

        // event data goes into request body
        $requestBody["title"] = $event->title . " Updated";
        $requestBody["_method"] = 'PUT';
        
        $response = $this->post('/api/events/'.$event->id, $requestBody, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Updated successfuly',
            'event' => [
                'title' => $event->title . " Updated",
                'description' => $event->description
            ]
        ]);
        
    }


    /**
     * Test updating event when user is not the host of the event 
     *
     * @return void
     */
    public function test_updating_event_user_not_host()
    {
        $authUserData = User::factory()
                        ->has(Event::factory()->count(1), 'hostingEvents')
                        ->create();

        $csrfToken = $this->login($authUserData->toArray());

        // create a new user and his event
        $newUserData = User::factory()
                        ->has(Event::factory()->count(1), 'hostingEvents')
                        ->create();

        $newUsersEvent = $newUserData->hostingEvents()->get()->first();               

        // event data goes into request body
        $requestBody["title"] = $newUsersEvent->title . " Updated";
        $requestBody["_method"] = 'PUT';
        
        $response = $this->post('/api/events/'.$newUsersEvent->id, $requestBody, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(403);
        $response->assertJson([
            'message' => 'Unauthorized action.'
        ]);
        
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