<?php

$app->post('/api/uploader', function ($request, $response, $args)
{
    try {
        
        $files = $request->getUploadedFiles();
    if (empty($files['image'])) {
        throw new Exception('No file has been send');
    }
    $myFile = $files['image'];
    if ($myFile->getError() === UPLOAD_ERR_OK) {
        $uploadFileName = $myFile->getClientFilename();
        $myFile->moveTo('../uploads/' . $uploadFileName);
        return $response->withJson(['data' => ['link' => 'http://localhost/eshop/backend/uploads/' . $uploadFileName]]);
    }
    } catch (\Throwable $th) {
        return $response->withStatus(500)->write($th);
    }
   

});
$app->get('/api', function ($request, $response, $args) {
    return $response->withStatus(200)->write('Hello From API!');
});

//User Controller
$app->get('/api/test', "UserController:get_user_data");

$app->get('/api/token', "UserController:token");
$app->get('/api/users', "UserController:index");
$app->post('/api/users/register', "UserController:register");
$app->post('/api/users/login', "UserController:login");

//Role
$app->get('/api/role', "RoleController:index");
$app->get('/api/role/{roleId}', "RoleController:findOne");
$app->post('/api/role', "RoleController:create");
$app->put('/api/role/{roleId}', "RoleController:update");
$app->delete('/api/role/{roleId}', "RoleController:delete");
$app->get('/api/role/{roleId}/Permissions', "RoleController:getRolePermissions");
$app->put('/api/role/{roleId}/Permissions', "RoleController:setPermissionsToRole");

//Permission
$app->get('/api/permission', "PermissionController:index");
$app->get('/api/permission/{permissionId}', "PermissionController:findOne");
$app->post('/api/permission', "PermissionController:create");
$app->put('/api/permission/{permissionId}', "PermissionController:update");
$app->delete('/api/permission/{permissionId}', "PermissionController:delete");

//userRole
$app->post('/api/setRolesTo/{userId}', "UserController:setRolesToUser");

//Products
$app->get('/api/products', "ProductController:index");
$app->get('/api/products/getProductsWithCategory', "ProductController:getProductsWithCategory");
$app->get('/api/products/{productId}', "ProductController:findOne");
$app->post('/api/products', "ProductController:create");
$app->put('/api/products/{productId}', "ProductController:update");
$app->delete('/api/products/{productId}', "ProductController:delete");

//category
$app->get('/api/category', "CategoryController:index");
$app->get('/api/categorydropDown', "CategoryController:dropDown");
$app->get('/api/category/{categoryId}', "CategoryController:findOne");
$app->get('/api/category/{categoryId}/products', "CategoryController:get_Category_Products");
$app->post('/api/category', "CategoryController:create");
$app->put('/api/category/{categoryId}', "CategoryController:update");
$app->delete('/api/category/{categoryId}', "CategoryController:delete");

//Admin Panel
$app->get('/api/adminPanel', "AdminPanelController:index");