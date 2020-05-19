<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{

    protected $fillable = [
        'product_id',
        'images'
    ];
    public function product()
    {  
        return $this->belongsTo(product::class);
    }
}