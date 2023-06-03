<?php

namespace App\Http\Controllers;

use \Validator;
use App\Models\Event;
use App\Models\Organization;
use Illuminate\Http\Request;
use App\Http\Resources\EventResource;
use App\Http\Resources\EventCollection;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Requests\UserAttendsEventRequest;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return new EventCollection($events);
    }

    public function allUserEvents(Request $request)
    {
        $events = $request->user()->hostingEvents()->get();

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

        $image = $request->file('image');

        if ($image) {
            $filename = time() . '-event' . $newEvent->id . '.' . $image->getClientOriginalExtension();
            $newEvent->image = Storage::putFileAs('event_images', $image, $filename);
        }

        $newEvent->save();

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
        $image = $request->file('image');
        
        if ($image) {
            if ($event->image) {
                Storage::delete($event->image);
            }
            
            $filename = time() . '-event' . $event->id . '.' . $image->getClientOriginalExtension();
            $event->image = Storage::putFileAs('event_images', $image, $filename);
        }

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

        if ($event->image) {
            Storage::delete($event->image);
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

    public function attendEvent(UserAttendsEventRequest $request)
    {
        $event = Event::find($request->event_id);
        $request->user()->attendingEvents()->save($event);

        return response()->json([
            'message' => 'Stored successfully!',
        ], 201);
    }

    public function notAttendingEvent(UserAttendsEventRequest $request)
    {
        $event = Event::find($request->event_id);
        $request->user()->attendingEvents()->detach($event);

        return response()->json([
            'message' => 'Removed successfully!',
        ], 200);
    }
}
