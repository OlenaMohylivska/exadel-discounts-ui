import React from "react"
import "./styles.scss"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import defaultErrorImage from "../../assets/defaultErrorImage.png"

const FetchError = ({ error }) => {
  return (
    <div className="error-container">
      <div className="error-col">
        <div className="error-text">
          Sorry, we have some problems with server ({error}). Take a small break and come back later!
        </div>
      </div>
      <img className="waiting" src={defaultErrorImage} alt="" />
      <div className="link-to-home">
        <Link to="/">
          <Button variant="primary">Back to Home Page</Button>
        </Link>
      </div>
    </div>
  )
}

export default FetchError

FetchError.propTypes = {
  error: PropTypes.string,
}
