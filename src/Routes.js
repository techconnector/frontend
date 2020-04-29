import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import GuestRoute from "./components/Routing/GuestRoute";
import PrivateRoute from "./components/Routing/PrivateRoute";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfileCreate from "./pages/Profile/Create";
import ProfileEdit from "./pages/Profile/Edit";
import ProfileEducationCreate from "./pages/Education/Create";
import ProfileExperienceCreate from "./pages/Experience/Create";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <GuestRoute exact path="/" component={Landing} />
        <GuestRoute exact path="/register" component={Register} />
        <GuestRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileCreate} />
        <PrivateRoute exact path="/edit-profile" component={ProfileEdit} />
        <PrivateRoute
          exact
          path="/add-education"
          component={ProfileEducationCreate}
        />
        <PrivateRoute
          exact
          path="/add-experience"
          component={ProfileExperienceCreate}
        />
      </Switch>
    </BrowserRouter>
  );
}
