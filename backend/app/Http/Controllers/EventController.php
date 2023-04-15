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
        //if an organization id was provided in request, we need to check if that organization belongs to the user that made the request
        if($request->organization_id){
            $org = Organization::find($request->organization_id);
            if($org->user_id !== $request->user()->id){
                return response()->json([
                    'message' => 'Unauthorized action.',
                ], 403);
            }
        }

        $newEvent = new Event();
        $newEvent->title = $request->title;
        $newEvent->description = $request->description;
        $newEvent->latitude = $request->latitude;
        $newEvent->longitude = $request->longitude;
        $newEvent->start_time = $request->start_time;
        //if an event is hosted by an organization, this value will represent the organization's representative. 
        $newEvent->host_id = $request->user()->id;
        //if an event is not hosted by an organization, this value will be null
        $newEvent->organization_id = $request->organization_id;
        $newEvent->save();

        return response()->json([
            'message' => 'Stored successfuly',
            'event' => new EventResource($newEvent)
        ], 200);
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
        if (!$this->checkIsHostOfEvent($event, $request->user()->id) || ($request->organization_id != $event->organization_id)) {
            return response()->json([
                'message' => 'Unauthorized action.',
            ], 403);
        }

        if (isset($request->title)) $event->title = $request->title;
        if (isset($request->description)) $event->description = $request->description;
        if (isset($request->latitude)) $event->latitude = $request->latitude;
        if (isset($request->longitude)) $event->longitude = $request->longitude;
        if (isset($request->start_time)) $event->start_time = $request->start_time;
        $event->save();

        return response()->json([
            'message' => 'Updated successfuly',
            'event' => new EventResource($event)
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $this->validateIdPathVariable($id);
        $event = Event::find($id);

        // if the user is not host of the event then it can't delete the event
        if (!$this->checkIsHostOfEvent($event, $request->user()->id) || ($request->organization_id != $event->organization_id)) {
            return response()->json([
                'message' => 'Unauthorized action.',
            ], 403);
        }

        $event->delete();

        return response()->json([
            'message' => 'Deleted successfuly',
        ], 200);
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
