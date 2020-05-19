<?php

namespace App\Controllers;
use \App\Models\Gallery;

class GalleryController extends Controller
{
    public function creatorId($request) {
        $token = $request->getAttribute("jwt");
        return $token['context']->id;
    }

    public function create ($request, $productId) {
        
        $gallery = Gallery::create([
            'product_id'=> $productId, 
            'images'=> $request->getParam('gallery')['images'],
        ]);
            return $gallery->id;
            
    }
    

    public function update ($request, $productId) {
            $galleryId =  $request->getParam('gallery')['id'];
            $gallery = Gallery::where('id', $galleryId)->first();
            if(!$gallery){
                return false;
            };
            $gallery->product_id = $productId;
            $gallery->images =  $request->getParam('gallery')['images'];
            $gallery->save();
        return true;
    }
}