<?php

namespace App\Controllers;

class AdminPanelController extends Controller
{


    public function index ($request, $response) {
        return $response->withJson("AdminPanelController is OK");
    }


}