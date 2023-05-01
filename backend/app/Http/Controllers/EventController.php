<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Organization;
use Illuminate\Support\Facades\Log;
use \Validator;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return new EventCollection($events);
    }

    public function store(StoreEventRequest $request)
    {
        // check if that organization belongs to the user that made the request
        if($request->organization_id) {
            
            $organisationOwnerId = Organization::find($request->organization_id)->user_id;
            
            if($organisationOwnerId !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized action.'], 403);
            }
        }
        
        $newEvent = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'start_time' => $request->start_time,
            'date' => $request->date,
            'host_id' => $request->user()->id,
            'organization_id' => $request->organization_id
        ]);

        return new EventResource($newEvent);
    }

    public function show($id)
    {
        $this->validateIdPathVariable($id);
        $event = Event::find($id);

        return new EventResource($event);
    }

    public function update(UpdateEventRequest $request, $id)
    {
        $this->validateIdPathVariable($id);
        $event = Event::find($id);

        // if the user is not host of the event then it can't modify the event
        if (!$this->checkIsHostOfEvent($event, $request->user()->id)) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }
        
        $event->fill($request->only(['title', 'description', 'latitude', 'longitude', 'start_time', 'date']));
        $event->save();

        return new EventResource($event);
    }

    public function destroy(Request $request, $id)
    {
        $this->validateIdPathVariable($id);
        $event = Event::find($id);

        // if the user is not host of the event then it can't delete the event
        if (!$this->checkIsHostOfEvent($event, $request->user()->id)) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        $event->delete();

        return response()->json(['message' => 'Deleted successfuly'], 200);
    }

    private function validateIdPathVariable($id)
    {
        $validator = Validator::make(
            compact('id'),
            ['id' => 'required|exists:events,id']
        )->validate();
    }

    private function checkIsHostOfEvent($event, int $userId): bool
    {
        if ($event->host_id == $userId) {
            return true;
        }

        return false;
    }
}
