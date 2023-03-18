<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdatePasswordTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test if register request returns is successful
     *
     * @return void
     */
    public function test_update_password_request_is_successful()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        // setting new password
        $passwordData["current_password"] = "password";
        $passwordData["password"] = "newpassword";
        $passwordData["password_confirmation"] = "newpassword";

        $requestBody = $passwordData;
        $requestBody["_method"] = 'PUT';

        $response = $this->post('/api/user/password', $requestBody, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ]);

        $user = \App\Models\User::where('name', $userData["name"])->where('email', $userData["email"])->first();

        $response->assertStatus(200);
        $this->assertTrue(
            Hash::check($passwordData["password"], $user->password)
        );
    }

    /**
     * Test if register request returns is successful
     *
     * @return void
     */
    public function test_update_user_password_error_messages()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        // setting new password
        $passwordData["current_password"] = "password";
        $passwordData["password"] = "newpas";
        $passwordData["password_confirmation"] = "newpas";
        

        $requestBody = $passwordData;
        $requestBody["_method"] = 'PUT';

        $response = $this->post('/api/user/password', $requestBody, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'The password must be at least 8 characters.',
            'errors' => [
                'password' => [
                    'The password must be at least 8 characters.'
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