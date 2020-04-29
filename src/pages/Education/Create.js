import React from "react";

import Master from "../../components/Layouts/Master";
import MainForm from "./MainForm";

function Create() {
  return (
    <Master>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attend
      </p>
      <small>* = required field</small>
      <MainForm />
    </Master>
  );
}

export default Create;
