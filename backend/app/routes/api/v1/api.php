<?php

$app->get('/api', function ($request, $response, $args) {
    return $response->withStatus(200)->write('Hello From API!');
});
$app->get('/api/show', function ($request, $response, $args) {
    return $response->withStatus(200)->write('Hello From Show Api');
});


$app->get('/api/token', "UserController:token");
$app->post('/api/users/register', "UserController:register");
$app->post('/api/users/login', "UserController:login");
$app->get('/api/users/login', function ($request, $response, $args) {
    $data = array('message' => 'Bob', 'age' => 40);
    return $response->withStatus(500)->withJson($data);
});

//Products
$app->get('/api/products', "ProductController:index");
$app->post('/api/products', "ProductController:create");
$app->put('/api/products/{productId}', "ProductController:create");