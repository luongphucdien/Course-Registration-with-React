import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../Home";
import SignIn from "../SignIn";
import { getToken } from "./Common";

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            path={(token) => getToken() ? '/home' : '/'}
            element={(token) => getToken() ? <Home/> : <SignIn/>}
        />
    )
}


export default PrivateRoute;