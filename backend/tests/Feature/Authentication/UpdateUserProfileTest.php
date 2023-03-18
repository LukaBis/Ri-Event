<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UpdateUserProfileTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test if register request returns is successful
     *
     * @return void
     */
    public function test_update_user_request_is_successful()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        // setting new user data
        $userData["name"] = "New Name";
        $userData["email"] = "newemail@example.com";

        $requestBody = $userData;
        $requestBody["_method"] = 'PUT';

        $response = $this->post('/api/user/profile-information', $requestBody, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ]);

        $user = \App\Models\User::where('name', 'New Name')->where('email', 'newemail@example.com')->first();

        $response->assertStatus(200);
        $this->assertNotNull($user);
    }

    /**
     * Test if register request returns is successful
     *
     * @return void
     */
    public function test_update_user_request_error_messages()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        // setting new user data
        $userData["name"] = null;
        $userData["email"] = "newemailexample.com";

        $requestBody = $userData;
        $requestBody["_method"] = 'PUT';

        $response = $this->post('/api/user/profile-information', $requestBody, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The name field is required. (and 1 more error)',
            'errors' => [
                'name' => [
                    'The name field is required.'
                ],
                'email' => [
                    'The email field must be a valid email address.'
                ]
            ]
        ]);
        
    }

    private function login(array $userData): string
    {
        $response = $this->get('/sanctum/csrf-cookie');

        $csrfToken = $response->cookie('XSRF-TOKEN');

        $headers = [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost',
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