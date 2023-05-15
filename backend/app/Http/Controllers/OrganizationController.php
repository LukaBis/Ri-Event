<?php

namespace App\Http\Controllers;

use \Validator;
use App\Models\Organization;
use Illuminate\Http\Request;
use App\Http\Resources\OrganizationResource;
use App\Http\Resources\OrganizationCollection;
use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;

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
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizationRequest $request)
    {
        $newOrg = Organization::create([
            'name' => $request->name,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'user_id' => $request->user()->id,
            'address' => $request->address
        ]);

        return new OrganizationResource($newOrg); 
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
     * Update the specified resource in storage.
     */
    public function update(UpdateOrganizationRequest $request, $id)
    {
        $this->validateIdPathVariable($id);
        $org = Organization::find($id);

        // if the user is not owner of the organization then it can't modify the event
        if (!$this->checkIsOwnerOfOrganization($org, $request->user()->id)) {
            return response()->json([
                'message' => 'Unauthorized action.',
            ], 403);
        }

        $org->fill($request->only(['name', 'address', 'latitude', 'longitude']));
        $org->save();

        return new OrganizationResource($org);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $this->validateIdPathVariable($id);
        $org = Organization::find($id);

        // if the user is not owner of the organization then it can't delete the event
        if (!$this->checkIsOwnerOfOrganization($org, $request->user()->id)) {
            return response()->json([
                'message' => 'Unauthorized action.',
            ], 403);
        }

        $org->delete();

        return response()->json(['message' => 'Deleted successfuly'], 200);
    }

    private function validateIdPathVariable($id)
    {
        $validator = Validator::make(
            compact('id'),
            ['id' => 'required|exists:organizations,id']
        )->validate();
    }

    private function checkIsOwnerOfOrganization($org, int $userId): bool
    {
        if ($org->user_id == $userId) {
            return true;
        }

        return false;
    }
}
