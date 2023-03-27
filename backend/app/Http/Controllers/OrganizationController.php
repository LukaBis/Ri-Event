<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Resources\OrganizationCollection;
use App\Http\Resources\OrganizationResource;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use \Validator;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $organizations = Organization::all();

        return new OrganizationCollection($organizations);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizationRequest $request)
    {
        $newOrg = new Organization();
        $newOrg->name = $request->name;
        $newOrg->latitude = $request->latitude;
        $newOrg->longitude = $request->longitude;
        $newOrg->user_id = $request->user()->id;
        $newOrg->address = $request->address;
        $newOrg->save();

        return response()->json([
            'message' => 'Stored successfuly',
            'organization' => new OrganizationResource($newOrg)
        ], 200); 
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $this->validateIdPathVariable($id);
        $organization = Organization::find($id);

        return new OrganizationResource($organization);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Organization $organization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Organization $organization)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        //
    }

    private function validateIdPathVariable($id)
    {
        $validator = Validator::make(
            compact('id'),
            ['id' => 'required|exists:events,id']
        )->validate();
    }
}
