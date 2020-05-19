<?php

namespace App\Controllers;
use \App\Models\Product;
use \App\Models\Specification;
use \App\Models\Gallery;


class ProductController extends Controller
{

    public function creatorId($request) {
        $token = $request->getAttribute("jwt");
        return $token['context']->id;
    }

    public function index ($request, $response) {
        $data = Product::with("category:id,title")->get();
        return $response->withStatus(200)->withJson($data);
    }
    public function findOne ($request, $response, $productId) {
        $data = Product::with(['attributes' => function ($query) { 
            $query->orderBy('id', 'asc');} ])->with('specifications')->with('galleries')->where('id', $productId)->first();
        if(!$data){
            return $response->withStatus(400)->withJson(["message" => "product not found"]);
         }
        return $response->withStatus(200)->withJson($data);
    }
    public function create ($request, $response) {

        $product = Product::create([
            'title'=> $request->getParam('title'), 
            'lead'=> $request->getParam('lead'), 
            'content'=> $request->getParam('content'),
            'category_id' => $request->getParam('category_id') ? $request->getParam('category_id') : 1,
            'price'=> $request->getParam('price'),
            'user_id' => $this->creatorId($request)
        ]);
        if(!$product){
            return $response->withStatus(500)->withJson([
                "message" => "SomeThing was Wrong in product" ]);
        }
        $attribute = AttributeController::CreateAttribute($request, $product->id);
        if(!$attribute) {
            return $response->withStatus(500)->withJson([
                "message" => "SomeThing was Wrong in attribute" ]);
        }
        $specification = $this->modifySpecifications($request, $product->id);
        if(!$specification) {
            return $response->withStatus(500)->withJson([
                "message" => "SomeThing was Wrong in specification" ]);
        }
        $gallery = GalleryController::create($request, $product->id);
        if(!$gallery) {
            return $response->withStatus(500)->withJson([
                "message" => "SomeThing was Wrong in gallery" ]);
        }
        return $response->withStatus(200)->withJson([
            "message" => "Create Product Successful from CreateAttribute", 
            'id' => $product->id
            ]);
        
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

            if(!$product){
                return $response->withStatus(500)->withJson([
                    "message" => "SomeThing was Wrong" ]);
            }
            $attribute = AttributeController::updateAttribute($request, $product->id);
            if(!$attribute) {
                return $response->withStatus(500)->withJson([
                    "message" => " updateAttribute SomeThing was Wrong" ]);
            }
            $specification = $this->updateSpecification($request, $product->id);
            if(!$specification) {
                return $response->withStatus(500)->withJson([
                    "message" => "SomeThing was Wrong with updateSpecification" ]);
            }
            $gallery = GalleryController::update($request, $product->id);
            if(!$gallery) {
                return $response->withStatus(500)->withJson([
                    "message" => "SomeThing was Wrong" ]);
            }
            return $response->withStatus(200)->withJson([
                "message" => "Create Product Successful from updateAttribute", 
                'id' => $product->id,
                ]);
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

    public function modifySpecifications ($request, $productId) {
        $specifications = $request->getParam('specifications');
        $data = array();
        foreach ($specifications as $specification) {
            $data[] = [
                'title' => $specification['title'],
                'description' => $specification['description'],
                'user_id' => $this->creatorId($request),
                'product_id' => $productId,
            ];
        }
        $CreateSpecification = Specification::insert($data);
    
        return $CreateSpecification;    
    }

    public function updateSpecification ($request, $productId) {
        try {
            $specifications = $request->getParam('specifications');
            foreach ($specifications as $specification) {
            Specification::updateOrCreate(
                [
                    'id' => $specification['id']
                ],[
                    'title' => $specification['title'],
                    'description' => $specification['description'],
                    'user_id' => $this->creatorId($request),
                    'product_id' => $productId,
                ]);
        }
        return true;
        } catch (\Throwable $th) {
            return $th;
        }
        
     }


}