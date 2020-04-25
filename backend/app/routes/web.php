<?php

$app->get('/', function ($request, $response, $args) {
    return $this->view->render($response, 'frontend/index.twig');
});
$app->get('/home', "HomeController:index")->setName('homePage');


$app->get('/register', "UserController:registerForm")->setName('auth.register');
$app->post('/register', "UserController:register");