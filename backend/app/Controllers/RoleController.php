<?php

namespace App\Controllers;
use \App\Models\Role;

class RoleController extends Controller
{

   public function test ($request, $response, $args) {
        return $response->withStatus(200)->write('Hello From Role API!');
    } 

    public function creatorId($request) {
        $token = $request->getAttribute("jwt");
        return $token['context']->id;
    }

    public function index ($request, $response) {
        $data = Role::all();
        return $response->withStatus(200)->withJson($data);
    }

    public function findOne ($request, $response, $roleId) {
        $data = Role::where('id', $roleId)->first();
        if(!$data){
            return $response->withStatus(400)->withJson(["message" => "role not found"]);
         }
        return $response->withStatus(200)->withJson($data);
    }
    public function create ($request, $response) {
        Role::create([
            'title'=> $request->getParam('title'), 
            'description'=> $request->getParam('description'),
            'status' => $request->getParam('status') ? $request->getParam('status') : 1,
            'user_id' => $this->creatorId($request)
        ]);
        return $response->withStatus(200)->withJson(["message" => "Create role Successful"]);
    }

    public function update ($request, $response, $roleId) {
            $role = Role::where('id', $roleId)->first();
            if(!$role){
                return $response->withStatus(400)->withJson(["message" => "role not found"]);
            };
            $role->title = $request->getParam('title');
            $role->description = $request->getParam('description');
            $role->status = $request->getParam('status') ? $request->getParam('status') : 1;
            $role->save();
        return $response->withStatus(200)->withJson(["message" => "role was updated Successful"]);
    }
    public function delete ($request, $response, $roleId) {
            $role = Role::where('id', $roleId)->first();
            if(!$role){
                return $response->withStatus(400)->withJson(["message" => "role not found"]);
            };
            $role->delete();
        return $response->withStatus(200)->withJson(["message" => "role was deleted Successful"]);
    }



}