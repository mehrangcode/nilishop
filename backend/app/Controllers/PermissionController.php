<?php

namespace App\Controllers;
use \App\Models\Permission;

class PermissionController extends Controller
{

    public function creatorId($request) {
        $token = $request->getAttribute("jwt");
        return $token['context']->id;
    }

    public function index ($request, $response) {
        $data = Permission::all();
        return $response->withStatus(200)->withJson($data);
    }

    public function findOne ($request, $response, $permissionId) {
        $data = Permission::where('id', $permissionId)->first();
        if(!$data){
            return $response->withStatus(400)->withJson(["message" => "permission not found"]);
         }
        return $response->withStatus(200)->withJson($data);
    }
    public function create ($request, $response) {
        Permission::create([
            'title'=> $request->getParam('title'),
            'user_id' => $this->creatorId($request)
        ]);
        return $response->withStatus(200)->withJson(["message" => "Create permission Successful"]);
    }

    public function update ($request, $response, $permissionId) {
            $permission = Permission::where('id', $permissionId)->first();
            if(!$permission){
                return $response->withStatus(400)->withJson(["message" => "permission not found"]);
            };
            $permission->title = $request->getParam('title');
            $permission->save();
        return $response->withStatus(200)->withJson(["message" => "permission was updated Successful"]);
    }
    public function delete ($request, $response, $permissionId) {
            $permission = Permission::where('id', $permissionId)->first();
            if(!$permission){
                return $response->withStatus(400)->withJson(["message" => "permission not found"]);
            };
            $permission->delete();
        return $response->withStatus(200)->withJson(["message" => "permission was deleted Successful"]);
    }



}