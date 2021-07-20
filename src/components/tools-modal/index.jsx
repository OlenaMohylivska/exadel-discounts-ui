import React from "react"
import { Button, Modal } from "react-bootstrap"
import PropTypes from "prop-types"
function ToolsModal({ show, setShow, text, deleteCategory }) {

  const confirm = () => {
    deleteCategory()
    setShow(false)
  }
  const refuse = () => {
    setShow(false)
  }

  return (
    <>
      <Modal show={show} onHide={refuse} backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are going to delete {text} category</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={refuse}>
            I`m not sure
          </Button>
          <Button variant="primary" onClick={confirm}>
            Delete anyway
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default ToolsModal

ToolsModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  text: PropTypes.string,
  deleteCategory: PropTypes.func
}