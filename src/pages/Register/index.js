import React, { Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Navbar from "../../components/Layouts/Navbar";
import Alert from "../../components/Layouts/Alert";
import { Input } from "../../components/Form";

function Register({ setAlert, register, errors, success }) {
  const formRef = useRef(null);

  useEffect(() => formRef.current.setErrors(errors), [errors]);
  useEffect(() => formRef.current.reset(), [success]);

  async function onSubmit(data) {
    if (data.password !== data.password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register(data);
    }
  }

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Alert />
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <Form ref={formRef} onSubmit={onSubmit} method="post" className="form">
          <Input placeholder="Name" name="name" error={errors.name} />
          <Input
            legend="This site uses Gravatar, so if you want a profile image, use a Gravatar email"
            placeholder="Email"
            name="email"
            error={errors.email}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            error={errors.password}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="password2"
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </Form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </Fragment>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    errors: auth.errors,
    success: auth.success,
  };
}

export default connect(mapStateToProps, { setAlert, register })(Register);
