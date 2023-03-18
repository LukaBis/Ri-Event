<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventCollection;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;

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
        // Show the details of a specific product
    }

    public function edit($id)
    {
        // Show the form for editing a specific product
    }

    public function update(Request $request, $id)
    {
        // Update a specific product in the database
    }

    public function destroy($id)
    {
        // Delete a specific product from the database
    }
}
