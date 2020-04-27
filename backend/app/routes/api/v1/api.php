<?php
$app->get('/api', function ($request, $response, $args) {
    return $response->withStatus(200)->write('Hello From API!');
});
$app->get('/api/test', "UserController:get_user_data");

$app->get('/api/token', "UserController:token");
$app->post('/api/users/register', "UserController:register");
$app->post('/api/users/login', "UserController:login");

//Products
$app->get('/api/products', "ProductController:index");
$app->get('/api/products/{productId}', "ProductController:findOne");
$app->post('/api/products', "ProductController:create");
$app->put('/api/products/{productId}', "ProductController:update");
$app->delete('/api/products/{productId}', "ProductController:delete");