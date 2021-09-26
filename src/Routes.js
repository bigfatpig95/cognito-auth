import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Electronic from "./containers/Electronic";
import Search from "./containers/Search";
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
         <Login />
     </Route>
     <Route exact path="/signup">
        <Signup />
     </Route>
     <Route exact path="/reset">
        <ResetPassword />
     </Route>
     <Route exact path="/notes/new">
       <NewNote />
     </Route>
     <Route exact path="/notes/:id">
      <Notes />
    </Route>
    <Route exact path="/Electronic">
      <Electronic />
    </Route>
    <Route exact path="/Search">
      <Search />
    </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}