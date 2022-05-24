import React from "react";
import { Route, Redirect } from "react-router-dom";
import { config } from "../utils/config";

function ProtectedRoute({component: Component, ...props}){
  return(
    <Route>
      { 
        () => props.isLoggedIn 
          ? <Component {...props}/> 
          : <Redirect to={`/${config.ROOT_URL}/sign-in`} /> 
      }
    </Route>
  )
}

export default ProtectedRoute;