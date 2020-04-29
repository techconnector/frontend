import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "@unform/web";

import {
  Button,
  Checkbox,
  FormGroup,
  Input,
  Textarea,
} from "../../components/Form";
import { addExperience } from "../../actions/profile";

function MainForm({
  experience = {},
  addExperience,
  success,
  errors,
  history,
}) {
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

  function onCurrentDateChange(e) {
    toggleDisabled(!toDateDisabled);
  }

  function onSubmit(data) {
    addExperience(data, history);
  }
  return (
    <Form
      initialData={experience}
      ref={formRef}
      onSubmit={onSubmit}
      method="post"
      className="form"
    >
      <FormGroup>
        <Input placeholder="* Job Title" name="title" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="* Company" name="company" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Location" name="location" />
      </FormGroup>
      <FormGroup>
        <h4>From Date</h4>
        <Input type="date" name="from" />
      </FormGroup>
      <FormGroup>
        <Checkbox
          label="Current Job"
          name="current"
          onChange={onCurrentDateChange}
        />
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
          placeholder="Job Description"
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
  addExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
};

function mapStateToProps({ profile }) {
  return {
    errors: profile.errors,
    success: profile.success,
  };
}

const mapDispatchToProps = { addExperience };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainForm));
