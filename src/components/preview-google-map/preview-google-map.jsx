import React, { useState } from "react"
import GoogleMap from "components/google-map/googleMap"
import CustomModalWindow from "components/custom-modal-window"
import PropTypes from "prop-types"
import "./styles.scss"

const PreviewGoogleMap = ({allAddresses}) => {
  const [show, setShow] = useState(false)

  const toggleModal = () => {
    setShow(!show)
  }

  return (
    <>
      <div className="google-map-icon-container" onClick={toggleModal}>
        <GoogleMap />
        <div className="superimposed-block">
          <h2 className="superimposed-block-text">Tap here to open map</h2>
        </div>
      </div>

      {show && <CustomModalWindow
        show={show}
        handleClose={toggleModal}
        modalText=""
        locations={allAddresses}
      />}
    </>
  )
}

export default PreviewGoogleMap

PreviewGoogleMap.propTypes = {
  allAddresses: PropTypes.array,
}