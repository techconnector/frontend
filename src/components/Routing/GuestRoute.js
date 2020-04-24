import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function GuestRoute({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={function (props) {
        return !isAuthenticated && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    />
  );
}

GuestRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(GuestRoute);
