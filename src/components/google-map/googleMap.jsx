import React from 'react'
import propTypes from 'prop-types'
import "./styles.scss"

const googleKey = "notRealKey"

const GoogleMap = ({ location }) => {
  return (
    <iframe
      className="map"
      src={`https://maps.google.com.ua/maps??key=${googleKey}&q=${location}&hl=en&output=embed`}>
    </iframe>
  )
}
export default GoogleMap

GoogleMap.propTypes = {
  location: propTypes.string
}