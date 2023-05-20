<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function PHPUnit\Framework\assertEquals;

class DeleteProfileImageTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test deleting profile image
     *
     * @return void
     */
    public function test_deleting_profile_image()
    {
        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        $imageFile = UploadedFile::fake()->image('test-image.jpg');

        $response = $this->post('/api/profile-picture', ['_method' => 'PUT','image' => $imageFile], [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $filename = "profile_images/" . time() . "-user" . $userData["id"] . "." . $imageFile->getClientOriginalExtension();

        $response = $this->delete('/api/profile-picture', [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(200)->assertJson([
            'message' => 'Profile picture deleted successfully'
        ]);    

        Storage::disk('public')->assertExists("profile_images/blank-profile-image.jpg");
        Storage::disk('public')->assertMissing($filename);

        assertEquals($userData['image_path'], 'profile_images/blank-profile-image.jpg');
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