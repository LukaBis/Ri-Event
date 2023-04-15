<?php

namespace App\Models;

use App\Models\User;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Event extends Model
{
    use HasFactory;

    public function host(): BelongsTo
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'organization_id');
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

    //converts hh:mm:ss to hh:mm
    public function getStartTimeAttribute($value){
        return substr($value, 0, 5);
    }
}
