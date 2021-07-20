import React, { useState } from "react"
import Select from "react-select"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const AddLocation = ({
  countryLocation,
  citiesLocation,
  setCitiesLocation,
  addressesList,
  setAddressesList,
}) => {
  const [locationObj, setLocationObj] = useState({ name: "", addresses: [] })

  const [isEntered, setIsEntered] = useState(true)

  ////city
  const citiesOptions =
    countryLocation &&
    countryLocation.map((city) => {
      return {
        value: city.name,
        label: city.name,
        id: city.id,
        addresses: city.addresses,
      }
    })
  const cityHandleChange = (e) => {
    setLocationObj({ name: e.value, id: e.id })
    setAddressesList(e.addresses)
  }
  ////address
  const addressesOptions = addressesList && addressesList.map((address) => {
    return {
      value: address.address,
      label: address.address,
      address: address.address,
      id: address.id,
    }
  })

  const addressesHandleChange = (e) => {
    const arr = e.map((e) => ({
      address: e.address,
      id: e.id,
    }))
    setLocationObj({ ...locationObj, addresses: arr })
  }
  const save = () => {
    setCitiesLocation([...citiesLocation, locationObj])
    setIsEntered(false)
  }

  return (
    <>
      {citiesOptions && citiesOptions.length > 0 ? (
        <Select
          options={citiesOptions}
          onChange={(e) => {
            cityHandleChange(e)
          }}
          className="mt-3"
          placeholder="City"
          isDisabled={!isEntered}
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
            className="mt-3"
            placeholder="Address"
            isDisabled={!isEntered}
          />

          <Button
            varian="primary"
            className={
              isEntered ? "my-3 w-50 mx-auto" : "my-3 w-50 mx-auto d-none"
            }
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
