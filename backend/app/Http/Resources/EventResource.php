<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'address' => $this->address,
            'start_time' => $this->start_time,
            'date' => $this->date,
            'host' => $this->host()->get()->first()->name,
            'host_image' => $this->host()->get()->first()->image_path,
            'organization' => $this->organization()->get()->first() ? $this->organization()->get()->first()->name : null,
            'image' => $this->image,
            'attending' => $this->attendingUsers()->get()->contains($request->user()),
            'attendees' => $this->attendingUsers()->get(['image_path', 'name']),
            'number_of_guests' => $this->attendingUsers()->count(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
