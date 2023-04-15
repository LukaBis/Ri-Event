<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class StoreNewOrganizationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test storing new organization
     *
     * @return void
     */
    public function test_storing_new_organization()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        // organization data
        $orgData["name"] = "My New Organization";
        $orgData["latitude"] = 55;
        $orgData["longitude"] = 54;
        $orgData["address"] = "Some address";

        $response = $this->post('/api/organizations', $orgData, [
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
     * Test validation messages
     *
     * @return void
     */
    public function test_validation_messages()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        // org data
        $orgData["name"] = "My New Organization";
        $orgData["latitude"] = "something";
        $orgData["longitude"] = 54;
        $orgData["address"] = null;

        $response = $this->post('/api/organizations', $orgData, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(422)
         ->assertJson([
            'message' => 'The address field is required. (and 1 more error)', 
            'errors' => [
                'address' => [
                    'The address field is required.'
                ], 
                'latitude' => [
                    'The latitude field must be a number.'
                ]
            ]
         ]);
        
    }

    /**
     * Test un-authenticated request to storing a new organization
     *
     * @return void
     */
    public function test_unauthenticated_request()
    {
        $userData = User::factory()->create()->toArray();

        // no login

        // organization data
        $orgData["name"] = "My New Organization";
        $orgData["latitude"] = 55;
        $orgData["longitude"] = 54;
        $orgData["address"] = "Some address";

        $response = $this->post('/api/organizations', $orgData, [
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