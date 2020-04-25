import React, { useEffect, useRef, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Form } from "@unform/web";

import {
  Button,
  FormGroup,
  Input,
  Option,
  Select,
  Textarea,
} from "../../components/Form";
import { saveProfile } from "../../actions/profile";

function MainForm({
  profile = {},
  edit = false,
  saveProfile,
  success,
  errors,
  history,
}) {
  const formRef = useRef(null);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(onSuccess, [success]);
  useEffect(onError, [errors]);
  useEffect(onFormatFields, [profile]);

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

  function onFormatFields() {
    if (profile) {
      const skills = profile.skills.map((item) => item.name).join(",");
      formRef.current.setFieldValue("status", profile.status);
      formRef.current.setFieldValue("skills", skills);
    }
  }

  function onSubmit(data) {
    saveProfile(data, history, edit);
  }

  return (
    <Form
      initialData={profile}
      ref={formRef}
      onSubmit={onSubmit}
      method="post"
      className="form"
    >
      <FormGroup>
        <Select
          subtitle="Give us an idea of where you are at in your career"
          name="status"
        >
          <Option value="">* Select Professional Status</Option>
          <Option value="Developer">Developer</Option>
          <Option value="Junior Developer">Junior Developer</Option>
          <Option value="Senior Developer">Senior Developer</Option>
          <Option value="Manager">Manager</Option>
          <Option value="Student or Learning">Student or Learning</Option>
          <Option value="Instructor">Instructor or Teacher</Option>
          <Option value="Intern">Intern</Option>
          <Option value="Other">Other</Option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Input
          subtitle="Could be your own company or one you work for"
          placeholder="Company"
          name="company"
        />
      </FormGroup>
      <FormGroup>
        <Input
          subtitle="Could be your own or a company website"
          placeholder="Website"
          name="website"
        />
      </FormGroup>
      <FormGroup>
        <Input
          subtitle="City & state suggested (eg. Boston, MA)"
          placeholder="Location"
          name="location"
        />
      </FormGroup>
      <FormGroup>
        <Input
          subtitle="Please use comma separated values (eg. HTML,CSS,Javascript,PHP)"
          placeholder="* Skills"
          name="skills"
        />
      </FormGroup>
      <FormGroup>
        <Input
          subtitle="If you want your latest repos and Github link, include your username"
          placeholder="Github Username"
          name="github_username"
        />
      </FormGroup>
      <FormGroup>
        <Textarea
          subtitle="Tell us a little about yourself"
          placeholder="A short bio of yourself"
          name="bio"
        />
      </FormGroup>
      <div className="my-2">
        <Button
          type="button"
          className="btn-light"
          onClick={() => toggleSocialInputs(!displaySocialInputs)}
        >
          Add Social Network Links
        </Button>
        <small>Optional</small>
      </div>
      {displaySocialInputs && (
        <Fragment>
          <FormGroup className="social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <Input placeholder="Twitter URL" name="twitter" />
          </FormGroup>
          <FormGroup className="social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <Input placeholder="Facebook URL" name="facebook" />
          </FormGroup>
          <FormGroup className="social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <Input placeholder="Youtube URL" name="youtube" />
          </FormGroup>
          <FormGroup className="social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <Input placeholder="Linkedin URL" name="linkedin" />
          </FormGroup>
          <FormGroup className="social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <Input placeholder="Instagram URL" name="instagram" />
          </FormGroup>
        </Fragment>
      )}
      <Button type="submit" className="btn-primary my-1">
        Save
      </Button>
      <Link to="/dashboard" className="btn btn-light my-1">
        Go Back
      </Link>
    </Form>
  );
}

MainForm.propTypes = {
  profile: PropTypes.object,
  saveProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
};

function mapStateToProps({ profile }) {
  return {
    errors: profile.errors,
    success: profile.success,
  };
}

const mapDispatchToProps = { saveProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainForm));
