<?php

namespace App\Controllers;
use \App\Models\Product;

class ProductController extends Controller
{


    public function index ($request, $response) {
        $data = Product::all();
        return $response->withStatus(200)->withJson(["data" => $data]);
    }
    public function create ($request, $response) {
        Product::create([
            'title'=> $request->getParam('title'), 
            'lead'=> $request->getParam('lead'), 
            'content'=> $request->getParam('content'), 
            'price'=> $request->getParam('price'),
            'creatorId' => 1
        ]);
        return $response->withStatus(200)->withJson(["message" => "Create Product Successful"]);
    }

    public function update ($request, $response, $productId) {
            $product = App\Product::where('id', $productId)->first();
            if(!$product){
                return $response->withStatus(400)->withJson(["message" => "product not found"]);
            };
            $product->title = $request->getParam('title'); 
            $product->lead = $request->getParam('lead'); 
            $product->content = $request->getParam('content'); 
            $product->price = $request->getParam('price');
            $product->refresh();
        return $response->withStatus(200)->withJson(["message" => "Product was updated Successful"]);
    }


}