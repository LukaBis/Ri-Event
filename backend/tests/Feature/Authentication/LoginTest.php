<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class LoginTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test if login request returns a successful response
     *
     * @return void
     */
    public function test_login_request_returns_successful_response()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->get('/sanctum/csrf-cookie');

        // $token = $response->cookies->get('XSRF-TOKEN');
        $token = $response->cookie('XSRF-TOKEN');

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ], [
            'X-XSRF-TOKEN' => $token,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(200);
    }

    /**
     * Test if protected route returns the expected data after successful login
     *
     * @return void
     */
    public function test_getting_protected_route_after_login()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        // Log in the user
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $token = $response->cookie('XSRF-TOKEN');

        $response = $this->withHeaders([
            'X-XSRF-TOKEN' => $token,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ])->get('/api/user');

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'name' => 'John Doe',
            'email' => 'test@example.com',
        ]);
    }

    /**
     * Test if protected route returns an error after successful logout
     *
     * @return void
     */
    public function test_getting_protected_route_after_logout()
    {
        // Create a fake user
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        // Log in the user
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $token = $response->cookie('XSRF-TOKEN');

        $response = $this->withHeaders([
            'X-XSRF-TOKEN' => $token,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ])->post('/logout');

        // Assert that the response has a status code of 204
        $response->assertNoContent();

        // Send a GET request to the protected route with the CSRF token and Accept header
        $response = $this->withHeaders([
            'X-XSRF-TOKEN' => $token,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ])->get('/api/user');

        // Assert that the response has a status code of 401
        $response->assertStatus(401);

        // Assert that the response body contains the expected error message
        $response->assertExactJson([
            'message' => 'Unauthenticated.',
        ]);
    }

    /**
     * Test login and logout twice
     *
     * @return void
     */
    public function test_login_logout_twice()
    {
        // Create a fake user
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        // Log in the user
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $token = $response->cookie('XSRF-TOKEN');

        $response = $this->withHeaders([
            'X-XSRF-TOKEN' => $token,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ])->post('/logout');

        // Log in the user again
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $token = $response->cookie('XSRF-TOKEN');

        $response = $this->withHeaders([
            'X-XSRF-TOKEN' => $token,
            'Referer' => 'localhost',
            'Accept' => 'application/json',
        ])->post('/logout');

        // Assert that the response has a status code of 204
        $response->assertNoContent();
    }    
}