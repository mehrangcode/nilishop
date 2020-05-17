<?php

namespace App\Controllers;
use \App\Models\Permission;

class LoaderController extends Controller
{

    public function autoLoad ($class_name = null) {
        $class = explode("_", $class_name);
        $path = implode(DS, $class).".php";
        @require_once($path);
    }
    public function loader($request, $response) {
        $path = $request->getparam("path") ?  '../uploads' . $request->getparam("path") : "../uploads";
        $rel = "/";
        $up = null;
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

    public function checkIn($request, $response) {
        $path = '../uploads/';
        $folder = $request->getParam('folder');

        if(!empty($path . $folder)) {
            $path = "../uploads/" . $path . "/" . $folder;
        }

        ob_start();
        $out = ob_get_clean();

    }

    public function isEmpty ($path = null) {

        return (($files = @scandir($path)) && count($files) <= 2);
    }

}