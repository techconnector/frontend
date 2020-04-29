import React from "react";

import Master from "../../components/Layouts/Master";
import MainForm from "./MainForm";

function Create() {
  return (
    <Master>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Add any developer/programming positions
        that you have had in the past
      </p>
      <small>* = required</small>
      <MainForm />
    </Master>
  );
}

export default Create;
