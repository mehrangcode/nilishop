<?php

namespace App\Controllers;
use \App\Models\Product;

class ProductController extends Controller
{

    public function creatorId($request) {
        $token = $request->getAttribute("jwt");
        return $token['context']->id;
    }

    public function index ($request, $response) {
        $data = Product::all();
        return $response->withStatus(200)->withJson($data);
    }
    public function findOne ($request, $response, $productId) {
        $data = Product::where('id', $productId)->first();
        if(!$data){
            return $response->withStatus(400)->withJson(["message" => "product not found"]);
         }
        return $response->withStatus(200)->withJson($data);
    }
    public function create ($request, $response) {
        Product::create([
            'title'=> $request->getParam('title'), 
            'lead'=> $request->getParam('lead'), 
            'content'=> $request->getParam('content'),
            'category_id' => $request->getParam('category_id') ? $request->getParam('category_id') : 1,
            'price'=> $request->getParam('price'),
            'user_id' => $this->creatorId($request)
        ]);
        return $response->withStatus(200)->withJson(["message" => "Create Product Successful"]);
    }

    public function update ($request, $response, $productId) {
            $product = Product::where('id', $productId)->first();
            if(!$product){
                return $response->withStatus(400)->withJson(["message" => "product not found"]);
            };
            $product->title = $request->getParam('title'); 
            $product->lead = $request->getParam('lead'); 
            $product->content = $request->getParam('content');
            $product->category_id = $request->getParam('category_id') ? $request->getParam('category_id') : 1; 
            $product->price = $request->getParam('price');
            $product->save();
        return $response->withStatus(200)->withJson(["message" => "Product was updated Successful"]);
    }
    public function delete ($request, $response, $productId) {
            $product = Product::where('id', $productId)->first();
            if(!$product){
                return $response->withStatus(400)->withJson(["message" => "product not found"]);
            };
            $product->delete();
        return $response->withStatus(200)->withJson(["message" => "Product was deleted Successful"]);
    }
    public function getProductsWithCategory ($request, $response) {
            // $product = Product::where('id', $productId)->first();//->category;
            $products = Product::with("category:id,title")->get(); 
            if(!$products){
                return $response->withStatus(400)->withJson(["message" => "product not found"]);
            };
            
            $data = array();
            foreach ($products as $product) {
                $data[] = $product;
            }
        return $response->withStatus(200)->withJson($data);
    }


}