<?php
use App\Middleware\AccessMiddleware;


$app->post('/api/uploader', "LoaderController:uploader");
$app ->post("/api/loader", "LoaderController:loader");
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
$app->get('/api/products', "ProductController:index")->setName('getProducts#20')->add(new AccessMiddleware($container));
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

//Attributes
$app->get('/api/attrType', "AttributeController:index");
$app->get('/api/attrTypedropDown', "AttributeController:dropDown");
$app->get('/api/attrType/{attrTypeId}/attrs', "AttributeController:get_AttrNames");
// $app->get('/api/attrType/{attrTypeId}', "AttributeController:findOne");
$app->post('/api/attrType', "AttributeController:create");
$app->put('/api/attrType/{attrTypeId}', "AttributeController:update");
$app->delete('/api/attrType/{attrTypeId}', "AttributeController:delete");

//Attributes
$app->get('/api/attrName', "AttributeController:getAllAttrName");
$app->get('/api/attrNamedropDown', "AttributeController:dropDownAttrName");
$app->get('/api/attrName/{attrNameId}', "AttributeController:findOneAttrName");
$app->post('/api/attrName', "AttributeController:createAttrName");
$app->put('/api/attrName/{attrNameId}', "AttributeController:updateAttrName");
$app->delete('/api/attrName/{attrNameId}', "AttributeController:deleteAttrName");

//Admin Panel
$app->get('/api/adminPanel', "AdminPanelController:index");