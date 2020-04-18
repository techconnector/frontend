import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Form } from "@unform/web";

import Master from "../../components/Layouts/Master";
import { Input } from "../../components/Form";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

function Register({ setAlert, register, errors, success, isAuthenticated }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setErrors(errors);
    }
  }, [errors]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [success]);

  async function onSubmit(data) {
    if (data.password !== data.password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register(data);
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Master>
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
    </Master>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
};

function mapStateToProps({ auth }) {
  return {
    errors: auth.errors,
    success: auth.success,
    isAuthenticated: auth.isAuthenticated,
  };
}

const mapDispatchToProps = { setAlert, register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
