<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
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
        $newEvent = new Event();
        $newEvent->title = $request->title;
        $newEvent->description = $request->description;
        $newEvent->latitude = $request->latitude;
        $newEvent->longitude = $request->longitude;
        $newEvent->host_id = $request->user()->id;
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
        if(!$this->checkIsHostOfEvent($event, $request->user()->id)) {
            return response()->json([
                'message' => 'Unauthorized action.',
            ], 403); 
        }

        if(isset($request->title)) $event->title = $request->title;
        if(isset($request->description)) $event->description = $request->description;
        if(isset($request->latitude)) $event->latitude = $request->latitude;
        if(isset($request->longitude)) $event->longitude = $request->longitude;
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
        if(!$this->checkIsHostOfEvent($event, $request->user()->id)) {
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
        if($event->host_id == $userId) {
            return true;
        }

        return false;
    }
}
