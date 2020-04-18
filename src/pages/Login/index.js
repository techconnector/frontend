import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Form } from "@unform/web";

import Master from "../../components/Layouts/Master";
import { Input } from "../../components/Form";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";

function Login({ setAlert, login, errors, success, isAuthenticated }) {
  const formRef = useRef(null);

  useEffect(() => {
    if (errors.global) {
      setAlert(errors.global, "danger");
    }

    if (formRef.current) {
      formRef.current.setErrors(errors);
    }
  }, [setAlert, errors]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [success]);

  async function onSubmit(data) {
    const { email, password } = data;

    login(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Master>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <Form ref={formRef} onSubmit={onSubmit} method="post" className="form">
        <div className="form-group">
          <Input type="email" name="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <Input type="password" name="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </Form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Master>
  );
}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
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

const mapDispatchToProps = { setAlert, login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
