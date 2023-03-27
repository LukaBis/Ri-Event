<?php

namespace App\Models;

use App\Models\Event;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organization extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function hostingEvents(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
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
