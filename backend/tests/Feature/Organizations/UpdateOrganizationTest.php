<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Organization;
use Illuminate\Support\Facades\Hash;

class UpdateOrganizationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test updating organization
     *
     * @return void
     */
    public function test_updating_organization()
    {
        $userData = User::factory()
                        ->has(Organization::factory()->count(1), 'organisations')
                        ->create();

        $organization = $userData->organisations()->get()->first();

        $csrfToken = $this->login($userData->toArray());

        
        // organization data goes into request body
        $requestBody["name"] = $organization->name . " Updated";
        $requestBody["_method"] = 'PUT';
        
        $response = $this->post('/api/organizations/'.$organization->id, $requestBody, [
            'X-XSRF-TOKEN' => $csrfToken,
            'Referer' => 'localhost:3000',
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'name' => $organization->name . " Updated",
                'address' => $organization->address
            ]
        ]);
        
    }


    /**
     * Test updating organization when user is not the owner of the organization 
     *
     * @return void
     */
    public function test_updating_organization_user_not_owner()
    {
        $authUserData = User::factory()
                        ->has(organization::factory()->count(1), 'organisations')
                        ->create();

        $csrfToken = $this->login($authUserData->toArray());

        // create a new user and his organization
        $newUserData = User::factory()
                        ->has(Organization::factory()->count(1), 'organisations')
                        ->create();

        $newUsersOrganization = $newUserData->organisations()->get()->first();               

        // organization data goes into request body
        $requestBody["name"] = $newUsersOrganization->name . " Updated";
        $requestBody["_method"] = 'PUT';
        
        $response = $this->post('/api/organizations/'.$newUsersOrganization->id, $requestBody, [
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