<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test if register request returns is successful
     *
     * @return void
     */
    public function test_register_request_is_successful()
    {
        $userData = [
            'name' => 'test',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->get('/sanctum/csrf-cookie');
        $token = $response->cookie('XSRF-TOKEN');

        $response = $this->post('/register', $userData, [
            'X-XSRF-TOKEN' => $token,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ]);

        $user = \App\Models\User::where('name', 'test')->where('email', 'test@example.com')->first();

        $response->assertStatus(201);
        $this->assertNotNull($user);
    }
}