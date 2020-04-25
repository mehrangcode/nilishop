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

    public function token($request, $response) {
        $token = $this->getToken(1, "mehran");
        $data = array('token' => $token);
        return $response->withStatus(500)->withJson($data);
    }

    public function create ($request, $response) {

        User::create([
            'name'=> 'Mehran Ganjgahi',
            'email'=> 'Mehran@mail.com',
            'password'=> 'Moorche64',
            'avatar'=> 'avatar',
        ]);

        return $this->view->render($response, "home.twig");
    }

    public function registerForm ($request, $response) {
        return $this->view->render($response, "auth/register.twig");
    }

    public function register ($request, $response) {

        User::create([
            'name'=> $request->getParam('name'), 
            'email'=>  $request->getParam('email'), 
            'password'=>  password_hash($request->getParam('password'), PASSWORD_DEFAULT),
        ]);

        return $response->withRedirect($this->router->pathFor('homePage'));
    }


}