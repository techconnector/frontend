import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Master from "../../components/Layouts/Master";
import { getCurrentProfile } from "../../actions/profile";

function Dashboard({ getCurrentProfile, auth, profile }) {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <Master>
      <h1 className="large text-primary">Dashboard</h1>
    </Master>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

function mapStateToProps({ profile, auth }) {
  return {
    auth,
    profile,
  };
}

const mapDispatchToProps = {
  getCurrentProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
