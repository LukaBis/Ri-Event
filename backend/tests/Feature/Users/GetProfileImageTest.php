<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GetProfileImageTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test getting profile image
     *
     * @return void
     */
    public function test_getting_profile_image()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        $response = $this->get('/api/profile-picture', [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'url' => 'profile_images/blank-profile-image.jpg'
        ]);    
    }

    /**
     * Test un-authenticated request for getting profile image
     *
     * @return void
     */
    public function test_unauthenticated_request()
    {
        $userData = User::factory()->create()->toArray();

        //no login

        $response = $this->get('/api/profile-picture', [
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