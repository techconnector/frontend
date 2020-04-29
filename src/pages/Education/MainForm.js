import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "@unform/web";

import { Button, FormGroup, Input, Textarea } from "../../components/Form";
import { addEducation } from "../../actions/profile";

function MainForm({ education = {}, addEducation, success, errors, history }) {
  const formRef = useRef(null);
  const [toDateDisabled, toggleDisabled] = useState(false);

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

  function toggleToDateDisabled() {
    toggleDisabled(!toDateDisabled);
  }

  function onSubmit(data) {
    addEducation(data, history);
  }

  return (
    <Form
      initialData={education}
      ref={formRef}
      onSubmit={onSubmit}
      method="post"
      className="form"
    >
      <FormGroup>
        <Input placeholder="* School or Bootcamp" name="school" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="* Degree or Certificate" name="degree" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Field Of Study" name="field_of_study" />
      </FormGroup>
      <FormGroup>
        <h4>From Date</h4>
        <Input type="date" name="from" />
      </FormGroup>
      <FormGroup>
        <p>
          <Input
            type="checkbox"
            name="current"
            value=""
            onClick={toggleToDateDisabled}
          />{" "}
          Current School
        </p>
      </FormGroup>
      <FormGroup>
        <h4>To Date</h4>
        <Input
          type="date"
          name="to"
          disabled={toDateDisabled ? "disabled" : ""}
        />
      </FormGroup>
      <FormGroup>
        <Textarea
          placeholder="Program Description"
          name="description"
          cols="30"
          rows="5"
        />
      </FormGroup>
      <Button type="submit" className="btn-primary my-1">
        Save
      </Button>
      <Link to="/dashboard" className="btn-light my-1">
        Go Back
      </Link>
    </Form>
  );
}

MainForm.propTypes = {
  education: PropTypes.object,
  addEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
};

function mapStateToProps({ profile }) {
  return {
    errors: profile.errors,
    success: profile.success,
  };
}

const mapDispatchToProps = { addEducation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainForm));
