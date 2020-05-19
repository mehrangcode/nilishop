<?php

$container['view'] = function ($container) {
    
    $view = new \Slim\Views\Twig(__DIR__ . '/../resources/views', [
    'cache' => false
    ]);

    // Instantiate and add Slim specific extension
    $router = $container->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $view->addExtension(new \Slim\Views\TwigExtension($router, $uri));

    return $view;
};

$container['HomeController'] = function($container) {
    return new \App\Controllers\HomeController($container);
};
$container['UserController'] = function($container) {
    return new \App\Controllers\UserController($container);
};
$container['ProductController'] = function($container) {
    return new \App\Controllers\ProductController($container);
};
$container['CategoryController'] = function($container) {
    return new \App\Controllers\CategoryController($container);
};
$container['RoleController'] = function($container) {
    return new \App\Controllers\RoleController($container);
};
$container['PermissionController'] = function($container) {
    return new \App\Controllers\PermissionController($container);
};
$container['AdminPanelController'] = function($container) {
    return new \App\Controllers\AdminPanelController($container);
};
$container['AttributeController'] = function($container) {
    return new \App\Controllers\AttributeController($container);
};
$container['LoaderController'] = function($container) {
    return new \App\Controllers\LoaderController($container);
};
$container['GalleryController'] = function($container) {
    return new \App\Controllers\GalleryController($container);
};