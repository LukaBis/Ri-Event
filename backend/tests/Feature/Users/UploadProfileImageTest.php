<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UploadProfileImageTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test uploading profile image
     *
     * @return void
     */
    public function test_uploading_profile_image()
    {
        Storage::fake('public/profile_images');

        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        $imageFile = UploadedFile::fake()->image('test-image.jpg');

        $response = $this->post('/api/profile-picture', ['_method' => 'PUT','image' => $imageFile], [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(200)->assertJson([
            'message' => 'Profile picture uploaded successfully'
        ]);

        $filename = "profile_images/" . time() . "-user" . $userData["id"] . "." . $imageFile->getClientOriginalExtension();
        Storage::disk('public')->assertExists($filename);

        Storage::disk('public')->delete($filename);
    }

    /**
     * Test uploading profile image with wrong extension
     *
     * @return void
     */
    public function test_uploading_profile_image_with_wrong_type()
    {
        Storage::fake('public/profile_images');

        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        $imageFile = UploadedFile::fake()->image('test-image.gif');

        $response = $this->post('/api/profile-picture', ['_method' => 'PUT','image' => $imageFile], [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(422)
         ->assertJson([
            'message' => 'The image field must be a file of type: jpeg, jpg, png.',
            'errors' => [
                'image' => [
                    'The image field must be a file of type: jpeg, jpg, png.'
                ]
            ]
         ]);
    }

    /**
     * Test uploading profile image with wrong dimensions
     *
     * @return void
     */
    public function test_uploading_profile_image_with_wrong_dimensions()
    {
        Storage::fake('public/profile_images');

        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        $imageFile = UploadedFile::fake()->image('test-image.png', 100, 200);

        $response = $this->post('/api/profile-picture', ['_method' => 'PUT','image' => $imageFile], [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(422)
         ->assertJson([
            'message' => 'The image field has invalid image dimensions.',
            'errors' => [
                'image' => [
                    'The image field has invalid image dimensions.'
                ]
            ]
         ]);
    }

    /**
     * Test that the default image is not deleted when uploading new image
     *
     * @return void
     */
    public function test_default_image_is_not_deleted()
    {
        Storage::fake('public/profile_images');

        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        $imageFile = UploadedFile::fake()->image('test-image.jpg');

        $response = $this->post('/api/profile-picture', ['_method' => 'PUT','image' => $imageFile], [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $filename = "profile_images/" . time() . "-user" . $userData["id"] . "." . $imageFile->getClientOriginalExtension();

        Storage::disk('public')->assertExists("profile_images/blank-profile-image.jpg");

        Storage::disk('public')->delete($filename);
    }

    /**
     * Test that the old image is not deleted when uploading new image
     *
     * @return void
     */
    public function test_old_image_is_not_deleted()
    {
        Storage::fake('public/profile_images');

        $userData = User::factory()->create()->toArray();

        $csrfToken = $this->login($userData);

        $imageFileOld = UploadedFile::fake()->image('test-image-old.jpg');

        $response = $this->post('/api/profile-picture', ['_method' => 'PUT','image' => $imageFileOld], [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $filenameOld = "profile_images/" . time() . "-user" . $userData["id"] . "." . $imageFileOld->getClientOriginalExtension();

        $imageFileNew = UploadedFile::fake()->image('test-image-new.jpg');

        $response = $this->post('/api/profile-picture', ['_method' => 'PUT','image' => $imageFileNew], [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json',
        ]);

        $filenameNew = "profile_images/" . time() . "-user" . $userData["id"] . "." . $imageFileNew->getClientOriginalExtension();

        Storage::disk('public')->assertMissing($filenameOld);

        Storage::disk('public')->delete($filenameNew);
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