<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{

    protected $fillable = [
        'product_id',
        'attr_type_id',
        'attr_name_id',
        'description',
        'title',
        'stock',
        'price_scale',
        'status',
        'user_id'
    ];

    public function attrType()
    {        
        
        return $this->belongsTo(AttrType::class);

    }
    public function attrName()
    {        
        
        return $this->belongsTo(attrName::class);

    }
    public function product()
    {        
        
        return $this->belongsTo(product::class);

    }
}