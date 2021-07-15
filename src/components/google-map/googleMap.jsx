import React from 'react'
import propTypes from 'prop-types'
import "./style.scss"

const googleKey = "notRealKey"
const GoogleMapComponent = ({ location }) => {
  return (
    <iframe
      className="map"
      src={`https://maps.google.com.ua/maps??key=${googleKey}&q=${location}&hl=en&output=embed`}>
    </iframe>
  )
}
export default GoogleMapComponent

GoogleMapComponent.propTypes = {
  location: propTypes.string
}