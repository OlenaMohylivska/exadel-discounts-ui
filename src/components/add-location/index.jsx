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

  const addToActualLocation = () => {
    if (check) {
      setActualLocation([...actualLocation, locationBuilder])
      setCheck(false)
    } else {
      return
    }
  }
  addToActualLocation()
  const selectCountry = (
    <Select
      options={countryOptions}
      onChange={(e) => {
        countryHandleChange(e)
      }}
      placeholder="country"
    />
  )
  const selectCity = (
    <Select
      options={cityOptions}
      onChange={(e) => cityHandleChange(e)}
      placeholder="city"
    />
  )
  const selectAdress = (
    <Select
      onChange={(e) => {
        addressHandleChange(e)
      }}
      options={addressOptions}
      placeholder="street"
      isMulti
    />
  )

  return (
    <>
      {chooseLocation.length !== 0 ?? selectCountry}
      {cityLocation.length !== 0 ?? selectCity}
      {addressLocation.length !== 0 ?? selectAdress}

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
