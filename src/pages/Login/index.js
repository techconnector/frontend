import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";

import Master from "../../components/Layouts/Master";
import { Button, FormGroup, Input } from "../../components/Form";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";

function Login({ setAlert, login, errors, success }) {
  const formRef = useRef(null);

  useEffect(onSuccess, [success]);
  useEffect(onError, [setAlert, errors]);

  function onSuccess() {
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  function onError() {
    if (errors.global) {
      setAlert(errors.global, "danger");
    }

    if (formRef.current) {
      formRef.current.setErrors(errors);
    }
  }

  function onSubmit(data) {
    const { email, password } = data;

    login(email, password);
  }

  return (
    <Master>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <Form ref={formRef} onSubmit={onSubmit} method="post" className="form">
        <FormGroup>
          <Input type="email" name="email" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" placeholder="Password" />
        </FormGroup>
        <Button type="submit" className="btn-primary">
          Register
        </Button>
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
};

function mapStateToProps({ auth }) {
  return {
    errors: auth.errors,
    success: auth.success,
  };
}

const mapDispatchToProps = { setAlert, login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
