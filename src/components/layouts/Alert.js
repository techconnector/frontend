import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Alert({ alerts }) {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        {alert.msg}
      </div>
    ))
  );
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    alerts: state.alert,
  };
}

export default connect(mapStateToProps)(Alert);
