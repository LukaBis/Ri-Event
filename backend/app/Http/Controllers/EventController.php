<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
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
        $newEvent->user_id = $request->user()->id;
        $newEvent->save();

        return response()->json(['message' => 'Stored successfuly'], 200); 
    }

    public function show($id)
    {
        $this->validateIdPathVariable($id);
        $event = Event::find($id);

        return new EventResource($event);
    }

    public function edit($id)
    {
        // Show the form for editing a specific event
    }

    public function update(Request $request, $id)
    {
        // Update a specific event in the database
    }

    public function destroy($id)
    {
        // Delete a specific event from the database
    }

    private function validateIdPathVariable($id)
    {
        $validator = Validator::make(
            compact('id'),
            ['id' => 'required|exists:events,id']
        )->validate();
    }
}
