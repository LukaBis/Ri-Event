<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventCollection;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return new EventCollection($events);
    }

    public function store(Request $request)
    {
        // Create a new product in the database
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
