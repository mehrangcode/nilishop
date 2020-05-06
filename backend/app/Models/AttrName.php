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

    public function attrType()
    {        
        
        return $this->belongsTo(AttrType::class);

    }
}