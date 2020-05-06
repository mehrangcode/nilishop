<?php

namespace App\Controllers;
use \App\Models\Attrtype;
use \App\Models\AttrName;
use \App\Models\Attribute;

class AttributeController extends Controller
{
    public function creatorId($request) {
        $token = $request->getAttribute("jwt");
        return $token['context']->id;
    }

    public function index ($request, $response) {
        $data = Attrtype::all();
        return $response->withStatus(200)->withJson($data);
    }
    public function dropDown ($request, $response) {
        $attrTypes = Attrtype::all();
        $data = array();
        foreach ($attrTypes as $attrType) {
            $data[] = ['id' => $attrType->id, 'title' => $attrType->title];
        }
        return $response->withStatus(200)->withJson(['data'=> $data]);
    }

    public function findOne ($request, $response, $attrTypeId) {
        $data = Attrtype::where('id', $attrTypeId)->first();
        if(!$data){
            return $response->withStatus(400)->withJson(["message" => "attrType not found"]);
         }
        return $response->withStatus(200)->withJson($data);
    }
    public function create ($request, $response) {
        Attrtype::create([
            'title'=> $request->getParam('title'), 
            'description'=> $request->getParam('description'),
            'status' => $request->getParam('status') ? $request->getParam('status') : 1,
            'user_id' => $this->creatorId($request)
        ]);
        return $response->withStatus(200)->withJson(["message" => "Create attrType Successful"]);
    }

    public function update ($request, $response, $attrTypeId) {
            $attrType = Attrtype::where('id', $attrTypeId)->first();
            if(!$attrType){
                return $response->withStatus(400)->withJson(["message" => "attrType not found"]);
            };
            $attrType->title = $request->getParam('title');
            $attrType->description = $request->getParam('description');
            $attrType->status = $request->getParam('status') ? $request->getParam('status') : 1;
            $attrType->save();
        return $response->withStatus(200)->withJson(["message" => "attrType was updated Successful"]);
    }
    public function delete ($request, $response, $attrTypeId) {
            $attrType = Attrtype::where('id', $attrTypeId)->first();
            if(!$attrType){
                return $response->withStatus(400)->withJson(["message" => "attrType not found"]);
            };
            $attrType->delete();
        return $response->withStatus(200)->withJson(["message" => "attrType was deleted Successful"]);
    }
   
    public function get_AttrNames ($request, $response, $attrTypeId) {
        // $attrNames = Attrtype::where('id', $attrTypeId)->attrNames;
        $attrNames = Attrtype::where('id', $attrTypeId)->first()->attrNames;
        if(!$attrNames){
            return $response->withStatus(400)->withJson(["message" => "attrNames was not found"]);
        };
        // return $attrNames;
        $data = array();
        foreach ($attrNames as $product) {
            $data[] = $product;
        }
    return $response->withStatus(200)->withJson(['data' => $data]);
}


/**
 * 
 * 
 * ATTR_NAME FUNCTIONS
 * 
 * 
 * 
 */
public function getAllAttrName ($request, $response) {
    $data = AttrName::all();
    return $response->withStatus(200)->withJson($data);
}
public function dropDownAttrName ($request, $response) {
    $attrNames = AttrName::all();
    $data = array();
    foreach ($attrNames as $attrName) {
        $data[] = ['id' => $attrName->id, 'title' => $attrName->title];
    }
    return $response->withStatus(200)->withJson(['data'=> $data]);
}

public function findOneAttrName ($request, $response, $attrNameId) {
    $data = AttrName::where('id', $attrNameId)->first();
    if(!$data){
        return $response->withStatus(400)->withJson(["message" => "attrName not found"]);
     }
    return $response->withStatus(200)->withJson($data);
}
public function createAttrName ($request, $response) {
    AttrName::create([
        'title'=> $request->getParam('title'), 
        'description'=> $request->getParam('description'),
        'attr_type_id'=> $request->getParam('attr_type_id'),
        'status' => $request->getParam('status') ? $request->getParam('status') : 1,
        'user_id' => $this->creatorId($request)
    ]);
    return $response->withStatus(200)->withJson(["message" => "Create attrName Successful"]);
}

public function updateAttrName ($request, $response, $attrNameId) {
        $attrName = AttrName::where('id', $attrNameId)->first();
        if(!$attrName){
            return $response->withStatus(400)->withJson(["message" => "attrName not found"]);
        };
        $attrName->title = $request->getParam('title');
        $attrName->description = $request->getParam('description');
        $attrName->attr_type_id = $request->getParam('attr_type_id');
        $attrName->save();
    return $response->withStatus(200)->withJson(["message" => "attrName was updated Successful"]);
}
public function deleteAttrName ($request, $response, $attrNameId) {
        $attrName = AttrName::where('id', $attrNameId)->first();
        if(!$attrName){
            return $response->withStatus(400)->withJson(["message" => "attrName not found"]);
        };
        $attrName->delete();
    return $response->withStatus(200)->withJson(["message" => "attrName was deleted Successful"]);
}


 public function CreateAttribute ($request, $productId) {
    $attributes = $request->getParam('attributes');
    $data = array();
    foreach ($attributes as $attribute) {
        $data[] = [
            'description' => $attribute['description'],
            'product_id' => $productId,
            'attr_type_id' => $attribute['attr_type_id'],
            'attr_name_id' => $attribute['attr_name_id'],
            'price_scale' => $attribute['price_scale'],
            'stock' => $attribute['stock']
        ];
    }
    $CreateAttribute = Attribute::insert($data);

    return ['CreateAttribute' => $CreateAttribute];
    

    
 }

}