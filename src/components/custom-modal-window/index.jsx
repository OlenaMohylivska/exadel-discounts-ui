import React from "react"
import { Button, Modal } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

const CustomModalWindow = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Body className="text-center">{props.modalText}</Modal.Body>
        <Modal.Footer>
          <NavLink exact to="/admin" className="nav-item">
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </NavLink>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CustomModalWindow

CustomModalWindow.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  modalText: PropTypes.string,
}
