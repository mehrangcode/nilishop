<?php

namespace App\Controllers;
use \App\Models\Permission;

class LoaderController extends Controller
{

    public function uploader($request, $response, $args)
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
    

    }
    public function fileUploader($request, $response, $args)
    {
        // unlink( $filename, $context ); it remove file
        try {
            
            $files = $request->getUploadedFiles();
        if (empty($files['image'])) {
            throw new Exception('No file has been send');
        }
        $myFile = $files['image'];
        if ($myFile->getError() === UPLOAD_ERR_OK) {
            $uploadFileName = $myFile->getClientFilename();
            $myFile->moveTo('../uploads' . $request->getParam('filename'));
            return $response->withJson([
                'data' => [
                        'link' => 
                        'http://localhost/eshop/backend/uploads' . $request->getParam('filename')
                    ]
                ]);
        }
        } catch (\Throwable $th) {
            return $response->withStatus(500)->write($th);
        }
    

    }

    public function loader($request, $response) {
        $path = $request->getparam("path") ?  '../uploads' . $request->getparam("path") : "../uploads";
        if($handle = opendir($path)) {

            $data = array();

            while (false != ($file = readdir($handle))) {
                $the_file = "";
                if(!in_array($file, array(".", ".."))) {
                    if(is_dir($path."/".$file)){
                        if($this->isEmpty($path."/".$file)){
                            $the_file = array("isDir" => true, "name" => $file, 'empty' => true, "path" => $path);
                        } else {
                            $the_file = array("isDir" => true, "name" => $file, 'empty' => false, "path" => $path);
                        }
                    } else {
                        $the_file = array("isDir" => false, "name" => $file, 'empty' => true, "path" => $path);
                    }
                    $data[] = $the_file;
                }
            }

            closedir($handle);

            return $response->withStatus(200)->withJson($data);
        }
        
        return $response->withStatus(500)->withJson(["message" => "Something was wrong"]);
    }

    public function isEmpty ($path = null) {

        return (($files = @scandir($path)) && count($files) <= 2);
    }

    public function createFolder($request, $response){
        //rmdir('examples'); it remove the dir
        $path = '../uploads' . $request->getparam("path");
        if (!mkdir($path, 0777, true)) {
           return $response->withStatus(500)->withJson(['message' => 'something wrong']);
        }
        return $response->withStatus(200)->withJson(['message' => 'Success']);

    }
}