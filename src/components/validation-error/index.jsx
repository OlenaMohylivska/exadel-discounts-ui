import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

const ValidationError = ({ error }) => {
  return <div className="error">{error}</div>;
};

export default ValidationError;

ValidationError.propTypes = {
  error: PropTypes.string,
};
