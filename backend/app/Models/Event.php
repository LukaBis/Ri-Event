<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    public function host(): BelongsTo
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function attendingUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function setLatitudeAttribute($value){
        $this->attributes['latitude'] = $value * 1000000;
    }

    public function setLongitudeAttribute($value){
        $this->attributes['longitude'] = $value * 1000000;
    }

    public function getLatitudeAttribute($value){
        return $value / 1000000;
    }

    public function getLongitudeAttribute($value){
        return $value / 1000000;
    }

}
