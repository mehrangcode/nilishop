<?php

namespace App\Controllers;
use \App\Models\User;
use \Firebase\JWT\JWT;
class UserController extends Controller
{

    public static function getToken($id, $user)
	{
		$secret = "MEHRANGANJI";

		// date: now
		$now = date('Y-m-d H:i:s');
		// date: now +2 hours
		$future = date('Y-m-d H:i:s', mktime(date('H') + 2, date('i'), date('s'), date('m'), date('d'), date('Y')));

		$token = array(
			'header' => [ 			// User Information
				'id' 	=> 	$id, 	// User id
				'user' 	=> 	$user 	// username
			],
			'payload' => [
				'iat'	=>	$now, 	// Start time of the token
				'exp'	=>	$future	// Time the token expires (+2 hours)
			]
		);

		// Encode Jwt Authentication Token
		return JWT::encode($token, $secret, "HS256");
	}

    public function get_user_data($request, $response) {
        $decoded = $request->getAttribute("jwt");
        return $response->withStatus(500)->withJson($decoded);
    }


    public function token($request, $response) {
        $token = $this->getToken(1, "mehran");
        $data = array('token' => $token);
        return $response->withStatus(200)->withJson($data);
    }

    public function login($request, $response) {
        $user = User::where('email', $request->getParam('email'))->first();
        // return $response->withStatus(400)->withJson($user);
        if($user){
            $token = $this->getToken($user->id, $user->name);
            $data = array('token' => $token);
            return $response->withStatus(200)->withJson($data);
        }

        return $response->withStatus(403)->withJson(["message" => "email or password is not valid"]);

    }

    public function register ($request, $response) {

        $user = User::where('email', $request->getParam('email'))->first();
        // return $response->withStatus(400)->withJson($user);
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


}