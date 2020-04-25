import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Master from "../../components/Layouts/Master";
import MainForm from "./MainForm";
import { getCurrentProfile } from "../../actions/profile";

function Edit({ getCurrentProfile, profile: { profile, loading } }) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile, loading]);

  return (
    <Master>
      <h1 className="large text-primary">Edit</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <MainForm profile={profile} edit={true} />
    </Master>
  );
}

Edit.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

function mapStateToProps({ profile }) {
  return {
    profile,
  };
}

const mapDispatchToProps = { getCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
