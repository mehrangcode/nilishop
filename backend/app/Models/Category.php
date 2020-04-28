<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    protected $fillable = [
        'title',
        'description',
        'status',
        'user_id'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}