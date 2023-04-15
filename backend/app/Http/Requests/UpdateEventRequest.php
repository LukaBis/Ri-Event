<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['min:3'],
            'description' => ['min:20'],
            'latitude' => ['numeric'],
            'longitude' => ['numeric'],
            'start_time' => ['date_format:H:i'],
            'date' => ['date']
        ];
    }
}
