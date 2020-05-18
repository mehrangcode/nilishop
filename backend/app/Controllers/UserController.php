<?php

namespace App\Controllers;
use \App\Models\User;
use \Firebase\JWT\JWT;
class UserController extends Controller
{

    public static function getToken($user)
	{
		$secret = "MEHRANGANJI";

		// date: now
		$now = date('Y-m-d H:i:s');
		// date: now +2 hours
		$future = date('Y-m-d H:i:s', mktime(date('H') + 2, date('i'), date('s'), date('m'), date('d'), date('Y')));

		$token = array(
			'context' => $user,
			'payload' => [
				'iat'	=>	$now, 	// Start time of the token
				'exp'	=>	$future	// Time the token expires (+2 hours)
			]
		);

		// Encode Jwt Authentication Token
		return JWT::encode($token, $secret, "HS256");
	}

    public function index($request, $response) {
        $users = User::all();
        return $response->withStatus(200)->withJson($users);
        // return $response->withStatus(200)->withJson( $decoded['context']->id);
    }
    public function get_user_data($request, $response) {
        $decoded = $request->getAttribute("jwt");
        return $response->withStatus(200)->withJson($decoded);
        // return $response->withStatus(200)->withJson( $decoded['context']->id);
    }
    public function login($request, $response) {
        $user = User::with('roles')->where('email', $request->getParam('email'))->first();
        if($user){
            if(password_verify($request->getParam('password') , $user->password ))
            {
                $user_permissions = array();
                $roles = array();
                foreach ($user->roles as $role) {
                    if($role->permissions){
                        foreach ($role->permissions as $permission) {
                            $user_permissions[] = $permission->id;
                        }
                    }
                    $roles[] = $role->title;
                };
            $data = array(
                'id'=> $user->id,
                'name' => $user->name,
                'roles' => $roles,
                'policy' =>  array_unique($user_permissions)
            );
            
                $token = $this->getToken($data);
                $data = array('token' => $token, 'user' => $data);
                return $response->withStatus(200)->withJson($data);
            }
        }

        return $response->withStatus(403)->withJson(["message" => "email or password is not valid"]);

    }

    public function register ($request, $response) {

        $user = User::where('email', $request->getParam('email'))->first();
        if($user){
            return $response->withStatus(400)->withJson(["message" => "email is already taken"]);
        }
        User::create([
            'name'=> $request->getParam('name'), 
            'email'=>  $request->getParam('email'), 
            'password'=>  password_hash($request->getParam('password'), PASSWORD_DEFAULT),
        ]);

        return $response->withStatus(200)->withJson(["message" => "Successful"]);
    }


    public function decodeToken($token)
    {
        try {
            return JWT::decode(
                $token,
                $this->_jwtKey,
                (array) $this->algorithm
            );
        } catch (\Exception $exception) {
            return false;
        }
    }

    public function setRolesToUser($request, $response, $userId){
        $roles = $request->getParam('roles');
       $user = User::find($userId)->first();
       $user->assignRole($roles);
       $user->with('roles');
        return $response->withStatus(200)->withJson(["message" => $user]);

    }

    public function getRolesToUser($request, $response, $userId){
        $roles = $request->getParam('roles');
       $user = User::with('roles:title')->where('id', $userId)->get();
        return $response->withStatus(200)->withJson(["message" => $user]);

    }
}