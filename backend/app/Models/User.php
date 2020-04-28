<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar'
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }


    public function assignRole($role)
{
    $this->roles()->sync($role);
}
    
    /***
 * @param string $role
 * @return $this
 */
public function addRole(array $newRoles)
{
    $roles = $this->getRoles();
    // $roles = array_unique($roles);
    $this->assignRole($roles);

    return $this;
}

/**
 * @param array $roles
 * @return $this
 */
public function setRoles(array $roles)
{
    $this->setAttribute('roles', $roles);
    return $this;
}

/***
 * @param $role
 * @return mixed
 */
public function hasRole($role)
{
    return in_array($role, $this->getRoles());
}

/***
 * @param $roles
 * @return mixed
 */
public function hasRoles($roles)
{
    $currentRoles = $this->getRoles();
    foreach($roles as $role) {
        if ( ! in_array($role, $currentRoles )) {
            return false;
        }
    }
    return true;
}

/**
 * @return array
 */
public function getRoles()
{
    $roles = $this->getAttribute('roles');

    if (is_null($roles)) {
        $roles = [];
    }

    return $roles;
}
}