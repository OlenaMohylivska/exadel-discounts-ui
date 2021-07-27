import React, { useState } from "react"
import { Toast, Row, Col } from "react-bootstrap"
import { BrightnessHighFill } from "react-bootstrap-icons"
import PropTypes from "prop-types"
const ErrorToast = ({ errorMessage, setIsErrorShown }) => {
  const [show, setShow] = useState(true)

  return (
    <Row className="toast-wrapper">
      <Col>
        <Toast
          className="toast-styling"
          onClose={() => {
            setShow(false)
            setIsErrorShown(false)
          }}
          show={show}
          delay={6000}
          autohide
        >
          <Toast.Header
            closeButton={false}
            className="toast-header bg-danger text-white"
          >
            <BrightnessHighFill />
            <strong className="me-auto ms-1">Error!</strong>
            <small className="me-2">Please try again</small>
          </Toast.Header>
          <Toast.Body className="bg-dark text-white">
            Something went wrong: <strong>{errorMessage}</strong>
          </Toast.Body>
        </Toast>
      </Col>
    </Row>
  )
}
export default ErrorToast

ErrorToast.propTypes = {
  errorMessage: PropTypes.string,
  setIsErrorShown: PropTypes.func
}