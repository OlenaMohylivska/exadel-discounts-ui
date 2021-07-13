import React from "react"
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"
// import withGoogleMap from "react-google-maps/lib/withGoogleMap"
// import withScriptjs from "react-google-maps/lib/withScriptjs"

const Map = () => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 53.904541, lng: 27.561523 }}
    />
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

const GoogleMapComponent = () => {
  return (
    <>
      <div style={{ width: "50vw", height: "50vw" }}>
        <WrappedMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDjKcbpukMF9c5g9iZnXQPv89aOpY7ML6w"
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </>
  )
}

export default GoogleMapComponent