import React from "react";

import Master from "../../components/Layouts/Master";
import MainForm from "./MainForm";

export default function Create() {
  return (
    <Master>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <MainForm />
    </Master>
  );
}
