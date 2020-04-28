<?php

namespace App\Controllers;
use \App\Models\Category;

class CategoryController extends Controller
{

   public function test ($request, $response, $args) {
        return $response->withStatus(200)->write('Hello From API!');
    } 

    public function creatorId($request) {
        $token = $request->getAttribute("jwt");
        return $token['context']->id;
    }

    public function index ($request, $response) {
        $data = Category::all();
        return $response->withStatus(200)->withJson($data);
    }

    public function findOne ($request, $response, $categoryId) {
        $data = Category::where('id', $categoryId)->first();
        if(!$data){
            return $response->withStatus(400)->withJson(["message" => "category not found"]);
         }
        return $response->withStatus(200)->withJson($data);
    }
    public function create ($request, $response) {
        Category::create([
            'title'=> $request->getParam('title'), 
            'description'=> $request->getParam('description'),
            'status' => $request->getParam('status') ? $request->getParam('status') : 1,
            'user_id' => $this->creatorId($request)
        ]);
        return $response->withStatus(200)->withJson(["message" => "Create category Successful"]);
    }

    public function update ($request, $response, $categoryId) {
            $category = Category::where('id', $categoryId)->first();
            if(!$category){
                return $response->withStatus(400)->withJson(["message" => "category not found"]);
            };
            $category->title = $request->getParam('title');
            $category->description = $request->getParam('description');
            $category->status = $request->getParam('status') ? $request->getParam('status') : 1;
            $category->save();
        return $response->withStatus(200)->withJson(["message" => "category was updated Successful"]);
    }
    public function delete ($request, $response, $categoryId) {
            $category = Category::where('id', $categoryId)->first();
            if(!$category){
                return $response->withStatus(400)->withJson(["message" => "category not found"]);
            };
            $category->delete();
        return $response->withStatus(200)->withJson(["message" => "category was deleted Successful"]);
    }
   


}