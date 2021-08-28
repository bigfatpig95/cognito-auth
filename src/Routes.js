import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
         <Login />
     </Route>
     <Route path="/signup">
        <Signup />
     </Route>
     <Route path="/reset">
        <ResetPassword />
     </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}