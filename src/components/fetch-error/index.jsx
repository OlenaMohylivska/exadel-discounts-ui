import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FetchError = ({ error }) => {
  return (
    <div className="error-container">
      <div className="error-col">
        <div className="error-text">
          Sorry have some problems with server(to be honest, it is {error}).
          Please, be patient and wait for fixing... Okay?
        </div>
        <div className="link-to-home">
          <Link to="/">
            <Button variant="primary">Back to Home Page</Button>
          </Link>
        </div>
      </div>
      <img
        className="waiting"
        src="https://i.pinimg.com/originals/cc/e8/ef/cce8ef91e7601e47dab1e56c973bf75c.jpg"
        alt=""
      />
    </div>
  );
};

export default FetchError;

FetchError.propTypes = {
  error: PropTypes.string,
};
