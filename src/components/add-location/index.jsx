import React, { useState } from "react"
import Select from "react-select"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const AddLocation = ({ chooseLocation, actualLocation, setActualLocation }) => {
  const [locationBuilder, setLocationBuilder] = useState({
    country: { name: "", cities: [] },
  })
  const [cityLocation, setCityLocation] = useState([])
  const [countryTargetLocation, setCountryTargetLocation] = useState("")
  const [cityTargetLocation, setCityTargetLocation] = useState("")
  const [addressLocation, setAddressLocation] = useState([])
  const [check, setCheck] = useState(false)
  const countryOptions = chooseLocation.map((country) => {
    return {
      value: country.name,
      label: country.name,
      cities: country.cities,
    }
  })

  const countryHandleChange = (e) => {
    setCityLocation(e.cities)
    setCountryTargetLocation(e.value)
  }
  const cityOptions = cityLocation.map((city) => {
    return {
      value: city.name,
      label: city.name,
      addresses: city.addresses,
    }
  })
  const cityHandleChange = (e) => {
    setAddressLocation(e.addresses)
    setCityTargetLocation(e.value)
  }

  const addressOptions = addressLocation.map((address) => {
    return {
      value: address.address,
      label: address.address,
      address: { address: address.address },
    }
  })
  const addressHandleChange = (e) => {
    const arr = e.map((elem) => elem.address)
    setLocationBuilder({
      country: countryTargetLocation,
      cities: [{ name: cityTargetLocation, addresses: arr }],
    })
  }
  console.log(locationBuilder)
  const addToActualLocation = () => {
    if (check) {
      setActualLocation([...actualLocation, locationBuilder])
      setCheck(false)
    } else {
      return
    }
  }
  addToActualLocation()
  return (
    <>
      {chooseLocation.length !== 0 ? (
        <Select
          options={countryOptions}
          onChange={(e) => {
            countryHandleChange(e)
          }}
          placeholder="country"
        />
      ) : (
        ""
      )}
      {cityLocation.length !== 0 ? (
        <Select
          options={cityOptions}
          onChange={(e) => cityHandleChange(e)}
          placeholder="city"
        />
      ) : (
        ""
      )}
      {addressLocation.length !== 0 ? (
        <Select
          onChange={(e) => {
            addressHandleChange(e)
          }}
          options={addressOptions}
          placeholder="street"
          isMulti
        />
      ) : (
        ""
      )}

      <Button onClick={() => setCheck(true)} variant="primary">
        save
      </Button>
    </>
  )
}

export default AddLocation

AddLocation.propTypes = {
  chooseLocation: PropTypes.array,
  actualLocation: PropTypes.array,
  setActualLocation: PropTypes.func,
}
