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
import Music from "./containers/Music";
import Books from "./containers/Books";
import Others from "./containers/Others";
import Search from "./containers/Search";
import AboutUs from "./containers/AboutUs";
import ChatBot from "./containers/ChatBot";

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
    
    <Route exact path="/Music">
      <Music />
    </Route>

    <Route exact path="/Books">
      <Books />
    </Route>

    <Route exact path="/Others">
      <Others />
    </Route>
    
    <Route exact path="/Search">
      <Search />
    </Route>

    <Route exact path="/AboutUs">
      <AboutUs />
    </Route>

    <Route exact path="/ChatBot">
      <ChatBot />
    </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}