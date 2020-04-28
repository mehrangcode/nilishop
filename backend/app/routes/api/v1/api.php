<?php
$app->get('/api', function ($request, $response, $args) {
    return $response->withStatus(200)->write('Hello From API!');
});

//User Controller
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

//category
$app->get('/api/category', "CategoryController:index");
$app->get('/api/category/{categoryId}', "CategoryController:findOne");
$app->get('/api/category/{categoryId}/products', "CategoryController:get_Category_Products");
$app->post('/api/category', "CategoryController:create");
$app->put('/api/category/{categoryId}', "CategoryController:update");
$app->delete('/api/category/{categoryId}', "CategoryController:delete");