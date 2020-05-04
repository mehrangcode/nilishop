<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttrType extends Model
{

    protected $fillable = [
        'title',
        'description',
        'status',
        'user_id'
    ];

    public function attrNames()
    {
        return $this->hasMany(AttrName::class);
    }
}