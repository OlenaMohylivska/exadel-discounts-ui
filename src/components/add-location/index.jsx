import React, { useState } from "react"
import Select from "react-select"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import "./styles.scss"

const AddLocation = ({
  countryLocation,
  citiesLocation,
  setCitiesLocation,
  addressesList,
  setAddressesList,
}) => {
  const [locationObj, setLocationObj] = useState({ name: "", addresses: [] })

  ////city
  const citiesOptions =
    countryLocation &&
    countryLocation.map((city) => {
      return {
        value: city.name,
        label: city.name,
        addresses: city.addresses,
      }
    })
  const cityHandleChange = (e) => {
    setLocationObj({ name: e.value })
    setAddressesList(e.addresses)
  }
  ////address
  const addressesOptions = addressesList.map((address) => {
    return {
      value: address.address,
      label: address.address,
      address: address,
    }
  })

  const addressesHandleChange = (e) => {
    const arr = e.map((e) => e.address)
    setLocationObj({ ...locationObj, addresses: arr })
  }
  const save = () => {
    setCitiesLocation([...citiesLocation, locationObj])
  }

  return (
    <>
      {citiesOptions && citiesOptions.length > 0 ? (
        <Select
          options={citiesOptions}
          onChange={(e) => {
            cityHandleChange(e)
          }}
          className="margin-10px-top"
        />
      ) : (
        ""
      )}

      {addressesOptions && addressesOptions.length > 0 && (
        <>
          <Select
            onChange={(e) => addressesHandleChange(e)}
            options={addressesOptions}
            isMulti
            className="margin-10px-top"
          />

          <Button
            varian="primary"
            className="margin-10px-top margin-10px-bottom"
            onClick={() => save()}
          >
            Save
          </Button>
        </>
      )}
    </>
  )
}

export default AddLocation

AddLocation.propTypes = {
  countryLocation: PropTypes.array,
  citiesLocation: PropTypes.array,
  setCitiesLocation: PropTypes.func,
  addressesList: PropTypes.array,
  setAddressesList: PropTypes.func,
}
