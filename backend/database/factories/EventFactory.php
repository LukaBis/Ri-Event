<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {        
        $randomOrganization = $this->getRandomOrganization();

        return [
            'title' => fake()->sentence,
            'description' => fake()->paragraph,
            'latitude' => fake()->latitude,
            'longitude' => fake()->longitude,
            'address' => fake()->address,
            'start_time' => fake()->time('H:i', false),
            'date' => fake()->date,
            'image' => $this->getRandomEventImage(),
            'organization_id' => $randomOrganization ? $randomOrganization->id : null,
            'host_id' => $randomOrganization ? $randomOrganization->user()->get()->first()->id : User::inRandomOrder()->first()->id
        ];
    }

    private function getRandomEventImage()
    {
        // images inside the sotrage/app/public/event_images used for seeding
        $images = [
            'event_images/image1.jpeg',
            'event_images/image2.jpg',
            'event_images/image3.jpg',
            'event_images/image4.jpeg',
        ];

        $randomImage = $images[array_rand($images)];

        return $randomImage;
    }

    private function getRandomOrganization(): Organization | null
    {
        // 50 percent of the time give me Organization
        // other 50 percent of the time give me null
        $randomNumber = random_int(1, 2);

        if ($randomNumber == 1) {
            $randomOrganization = Organization::inRandomOrder()->first();
        } else {
            $randomOrganization = null;
        }

        return $randomOrganization;
    }
}
