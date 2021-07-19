import React, { useState } from "react"
import { Toast, Row, Col } from "react-bootstrap"
import { BrightnessHighFill } from "react-bootstrap-icons"
import "./styles.scss"
const ToastElement = () => {
  const [show, setShow] = useState(true)
  return (
    <Row className="toast-wrapper">
      <Col>
        <Toast
          className="toast-styling"
          onClose={() => setShow(false)}
          show={show}
          delay={4000}
          autohide
        >
          <Toast.Header
            closeButton={false}
            className="toast-header bg-primary text-white"
          >
            <BrightnessHighFill />
            <strong className="me-auto ms-1">Success!</strong>
            <small className="me-2">just now</small>
          </Toast.Header>
          <Toast.Body className="bg-light">
            The updates have been saved.
          </Toast.Body>
        </Toast>
      </Col>
    </Row>
  )
}
export default ToastElement
