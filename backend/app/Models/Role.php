<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    protected $fillable = [
        'title',
        'description',
        'status',
        'user_id'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }
    
    
    public function addPermissionsToRole($permission)
    {
        $this->permissions()->sync($permission);
    }

    

}