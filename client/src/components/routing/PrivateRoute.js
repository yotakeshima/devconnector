import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth: { isAuthenticated, loading }, ...props }) => {
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet {...props} />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
