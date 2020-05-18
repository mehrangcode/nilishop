<?php

namespace App\Middleware;

class AccessMiddleware extends Middleware {

    public function __invoke($request, $response, $next) {
        $token = $request->getAttribute("jwt");
        $policy = $token['context']->policy;
        $route = $request->getAttribute('route');
        $routeName = $route->getName();
        $permission = explode("#", $routeName)[1];
        // var_dump(explode("#", $routeName)[1]);
        if(!in_array($permission, $policy)){
            return $response->withStatus(401)->write("Not allowed here");
        }
        $response = $next($request, $response);

        return $response;
    }
}