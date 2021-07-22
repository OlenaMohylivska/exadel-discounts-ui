import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import GoogleMap from "components/google-map/googleMap"
import "./styles.scss"

const CustomModalWindow = (props) => {
  const [choosedLocation, setChoosedLocation] = useState(props.locations && props.locations[0])
  const [isActive, setIsActive] = useState(props.locations && props.locations[0])

  const changeMarkerHandler = (event) => {
    setChoosedLocation(event.target.innerHTML)
    setIsActive(event.target.innerHTML)
  }
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        animation={false}
        size="xl"
      >
        {props.locations ? (
          <Modal.Header className="d-flex flex-column-reverse flex-xl-row flex-lg-row flex-md-column-reverse">
            <Modal.Title style={{ width: "100%", height: "87vh" }}>
              <GoogleMap location={choosedLocation} />
            </Modal.Title>
            <Modal.Title className="address-block">
              <h2 className="mb-4 text-center">List of addresses</h2>
              <ol>
                {props.locations.map((el, index) => (
                  <li
                    className={`mb-4 location-string text-start ${
                      isActive === el && "active"
                    }`}
                    isActive={isActive}
                    onClick={changeMarkerHandler}
                    key={index}
                  >
                    {el}
                  </li>
                ))}
              </ol>
            </Modal.Title>
          </Modal.Header>
        ) : (
          <Modal.Body className="text-center">
            {props.modalText}
            <Modal.Footer>
              <NavLink exact to="/admin" className="nav-item">
                <Button variant="secondary" onClick={props.handleClose}>
                  Close
                </Button>
              </NavLink>
            </Modal.Footer>
          </Modal.Body>
        )}
      </Modal>
    </>
  )
}

export default CustomModalWindow

CustomModalWindow.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  modalText: PropTypes.string,
  locations: PropTypes.array,
}
