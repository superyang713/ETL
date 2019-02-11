import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute/AppliedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";

import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import NotFound from "./containers/NotFound/NotFound";
import Profile from "./containers/Profile/Profile";


export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/profile/:id" exact component={Profile} props={childProps}/>
    <Route component={NotFound}/>
  </Switch>;
