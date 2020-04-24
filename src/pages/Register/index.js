import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";

import Master from "../../components/Layouts/Master";
import { Button, FormGroup, Input } from "../../components/Form";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

function Register({ setAlert, register, errors, success }) {
  const formRef = useRef(null);

  useEffect(onSuccess, [success]);
  useEffect(onError, [errors]);

  function onSuccess() {
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  function onError() {
    if (formRef.current) {
      formRef.current.setErrors(errors);
    }
  }

  function onSubmit(data) {
    if (data.password !== data.password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register(data);
    }
  }

  return (
    <Master>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Form ref={formRef} onSubmit={onSubmit} method="post" className="form">
        <FormGroup>
          <Input placeholder="Name" name="name" error={errors.name} />
        </FormGroup>

        <FormGroup>
          <Input
            subtitle="This site uses Gravatar, so if you want a profile image, use a Gravatar email"
            placeholder="Email"
            name="email"
            error={errors.email}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            error={errors.password}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Confirm Password"
            name="password2"
          />
        </FormGroup>
        <Button type="submit" className="btn-primary">
          Register
        </Button>
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
};

function mapStateToProps({ auth }) {
  return {
    errors: auth.errors,
    success: auth.success,
  };
}

const mapDispatchToProps = { setAlert, register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
