<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // required by JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    // required by JWTSubject
    public function getJWTCustomClaims()
    {
        return [];
    }
}
