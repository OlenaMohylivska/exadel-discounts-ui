import Geocode from "react-geocode"
import { useState } from "react"

const formattedData = (date) => {
  const periodEnd = new Date(date)
  const perionDate = periodEnd.getDate() < 10 ? "0" + periodEnd.getDate() : periodEnd.getDate()
  let perionMonth = periodEnd.getMonth() + 1
  perionMonth = perionMonth < 10 ? "0" + perionMonth : perionMonth
  return `${perionDate}-${perionMonth}-${periodEnd.getFullYear()}`
}

const logout = () => {
  // eslint-disable-next-line no-undef
  localStorage.clear()
}

const geocodeAddress = (address) => {
  const googleKey = process.env.REACT_APP_GOOGLE_MAP_KEY

  const [addressGeocode, setAddressGeocode] = useState(null)

  Geocode.setApiKey(googleKey)

  Geocode.fromAddress(address).then( //"Eiffel Tower"
    (response) => {
      const { lat, lng } = response.results[0].geometry.location
      console.log(lat, lng)
      setAddressGeocode({ lat, lng })
    },
    (error) => {
      console.error(error)
    }
  )

  console.log(addressGeocode)
  return addressGeocode
}

export {
  formattedData,
  logout,
  geocodeAddress
}

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