<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'min:3'],
            'description' => ['required', 'min:20'],
            'latitude' => ['required', 'numeric'],
            'longitude' => ['required', 'numeric'],
            'start_time' => ['required', 'date_format:H:i'],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'image' => ['image', 'mimes:jpeg,jpg,png', 'nullable']
        ];
    }
}
