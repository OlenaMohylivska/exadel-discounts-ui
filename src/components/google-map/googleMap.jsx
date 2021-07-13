import React from "react"
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import { geocodeAddress } from "store/utils"
import propTypes from 'prop-types'

const googleKey = process.env.REACT_APP_GOOGLE_MAP_KEY

// Geocode.setApiKey(googleKey)

// Geocode.fromLatLng("48.8583701", "2.2922926").then(
//   (response) => {
//     const address = response.results[0].formatted_address
//     console.log(address)
//     console.log('here')
//   },
//   (error) => {
//     console.error(error)
//   }
// )

// Geocode.fromAddress("Eiffel Tower").then(
//   (response) => {
//     const { lat, lng } = response.results[0].geometry.location
//     console.log(lat, lng)
//   },
//   (error) => {
//     console.error(error)
//   }
// )

//{ lat: 53.904541, lng: 27.561523 }



// const Map = () => {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 53.904541, lng: 27.561523 }}>
//       {addressData.address.map(address => (
//         <Marker key={1} position={() => geocodeAddress(address)} />

//       ))}

//     </GoogleMap>
//   )
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map))

const GoogleMapComponent = ({addressData}) => {

  const WrappedMap = withScriptjs(withGoogleMap(Map))

  const Map = () => {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 53.904541, lng: 27.561523 }}>
        {addressData.address.map((address, index) => (
          <Marker key={index} position={() => geocodeAddress(address)} />
        ))}
      </GoogleMap>
    )
  }

  return (
    <>
      <div style={{ width: "50vw", height: "50vw" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleKey}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </>
  )
}

GoogleMapComponent.propTypes = {
  addressData: propTypes.array
}

export default GoogleMapComponent