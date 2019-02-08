import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";

import Home from "./containers/Home/Home";
import Resource from "./containers/Resource/Resource";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import NewNote from "./containers/NewNote/NewNote";
import NotFound from "./containers/NotFound/NotFound";
import Notes from "./containers/Notes/Notes";


export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/resource" exact component={Resource} props={childProps}/>
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps}/>
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />
    <Route component={NotFound}/>
  </Switch>;
