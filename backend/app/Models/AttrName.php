<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttrName extends Model
{

    protected $fillable = [
        'title',
        'description',
        'attr_type_id',
        'user_id'
    ];

    public function AttrType()
    {        
        
        return $this->belongsTo(Category::class);

    }
}