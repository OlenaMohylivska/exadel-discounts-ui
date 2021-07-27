import React, { useState } from "react"
import Select from "react-select"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"

const AddLocation = ({
  countryLocation,
  setSaveLocation,
  saveLocation,
  addressesList,
  setAddressesList,
  addNewLocation,
  buttonIndex,
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
  const addressesOptions =
    addressesList &&
    addressesList.map((address) => {
      return {
        value: address.address,
        label: address.address,
        address: address.address,
        id: address.id,
      }
    })

  const addressesHandleChange = (e) => {
    const arr = e.map((e) => ({
      id: e.id,
    }))
    setLocationObj({ ...locationObj, addresses: arr })
  }
  const save = () => {
    const arr = locationObj.addresses
    setSaveLocation(saveLocation.concat(arr))
    setIsEntered(false)
  }

  return (
    <>
      {citiesOptions && citiesOptions.length > 0 ? (
        <>
          {!buttonIndex && <span className="discount-subtitle">Location:</span>}
          <div className="d-flex">
            <Select
              options={citiesOptions}
              onChange={(e) => {
                cityHandleChange(e)
              }}
              className="w-100"
              placeholder="City"
              isDisabled={!isEntered}
            />
            {!buttonIndex && (
              <Button
                className="add-location-btn"
                onClick={() => addNewLocation()}
              >
                ✚
              </Button>
            )}
          </div>
        </>
      ) : (
        ""
      )}

      {addressesOptions && addressesOptions.length > 0 && (
        <>
          <Select
            onChange={(e) => addressesHandleChange(e)}
            options={addressesOptions}
            isMulti
            className="my-3"
            placeholder="Address"
            isDisabled={!isEntered}
          />

          <Button
            varian="primary"
            className={
              isEntered ? "my-3 w-25 mx-auto" : "my-3 w-25 mx-auto d-none"
            }
            onClick={() => save()}
          >
            Apply
          </Button>
        </>
      )}
    </>
  )
}

export default AddLocation

AddLocation.propTypes = {
  countryLocation: PropTypes.array,
  // citiesLocation: PropTypes.array,
  // setCitiesLocation: PropTypes.func,
  saveLocation: PropTypes.array,
  setSaveLocation: PropTypes.func,
  addressesList: PropTypes.array,
  setAddressesList: PropTypes.func,
  addNewLocation: PropTypes.func,
  buttonIndex: PropTypes.number,
}
