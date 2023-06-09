<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProfilePictureRequest;

class UserController extends Controller
{
    private const DEFAULT_PROFILE_IMAGE = 'profile_images/blank-profile-image.jpg';

    public function user(Request $request)
    {
        return $request->user();
    }

    public function showPicture()
    {
        return response()->json(['url' => auth()->user()->image_path]);
    }

    public function uploadPicture(StoreProfilePictureRequest $request)
    {
        $user = auth()->user();
        $image = $request->file('image');

        $filename = time() . '-user' . $user->id . '.' . $image->getClientOriginalExtension();
        $path = Storage::putFileAs('profile_images', $image, $filename);

        //if user previously had an image different than the default, that image needs to be deleted
        if ($user->image_path != self::DEFAULT_PROFILE_IMAGE) {
            Storage::delete($user->image_path);
        }

        $user->image_path = $path;
        $user->save();

        return response()->json([
            'message' => 'Profile picture uploaded successfully',
            'image'   => $path,
        ]);
    }

    //this method deletes user's picture and sets it to default
    public function deletePicture()
    {
        $user = auth()->user();

        if ($user->image_path != self::DEFAULT_PROFILE_IMAGE) {
            Storage::delete($user->image_path);

            $user->image_path = self::DEFAULT_PROFILE_IMAGE;
            $user->save();

            return response()->json(['message' => 'Profile picture deleted successfully']);
        }

        return response()->json(['message' => 'Nothing to delete']);
    }
}
