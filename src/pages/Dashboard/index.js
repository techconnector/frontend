import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Master from "../../components/Layouts/Master";
import Spinner from "../../components/Layouts/Spinner";
import { getCurrentProfile } from "../../actions/profile";

function Dashboard({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Master>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
          </p>
          {profile !== null ? (
            <Fragment>has</Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
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
