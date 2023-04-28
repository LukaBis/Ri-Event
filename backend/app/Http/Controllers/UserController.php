<?php

namespace App\Http\Controllers;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function user(Request $request)
    {
        return $request->user();
    }

    public function showPicture()
    {
        $user = auth()->user();
        $image = Storage::get($user->image_path);
        $image = Image::make($image);
        return $image->response('jpg');
    }

    public function uploadPicture(Request $request)
    {
        $user = auth()->user();
        $image = $request->file('image');
        $img = Image::make($image);

        if ($img->getHeight() != $img->getWidth()) {
            return response()->json(['message' => 'Unsuccessful upload - image needs to have same height and width']);
        } 
        else if( $image->getClientOriginalExtension() != 'jpg' && $image->getClientOriginalExtension() != 'png' && $image->getClientOriginalExtension() != 'jpeg'){
            return response()->json(["message" => "Unsuccessful upload - image needs to be of type 'jpg', 'jpeg' or 'png'"]);
        }
        else {
            $filename = time() . '-user' . $user->id . '.' . $image->getClientOriginalExtension();
            //$image->storeAs('profile_images', $filename);

            $path = Storage::putFileAs('profile_images', $image, $filename);

            //if user previously had an image different than the default, that image needs to be deleted
            if ($user->image_path != 'profile_images/blank-profile-image.jpg') {
                Storage::delete($user->image_path);
            }

            //$user->image_path = 'profile_images/' . $filename;
            $user->image_path = $path;
            $user->save();

            return response()->json(['message' => 'Profile picture uploaded successfully']);
        }
    }

    //this method deletes user's picture and sets it to default
    public function deletePicture(){
        $user = auth()->user();

        if ($user->image_path != 'profile_images/blank-profile-image.jpg') {
            Storage::delete($user->image_path);

            $user->image_path = 'profile_images/blank-profile-image.jpg';
            $user->save();
        }

        return response()->json(['message' => 'Profile picture deleted successfully']);
    }
}
