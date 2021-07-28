import React, { useState, useEffect } from "react"
import { FormControl, Button } from "react-bootstrap"
import axiosInstance from "components/api"
import PropTypes from "prop-types"
import "./styles.scss"

const CreateLocation = ({ setLocationArr, locationArr }) => {
  const [country, setCountry] = useState(null)
  const [newLocation, setNewLocation] = useState({ address: null, city: {} })
  const [newCity, setNewCity] = useState({})
  const [isEntered, setIsEntered] = useState(true)
  useEffect(() => {
    setNewLocation({ city: newCity })
  }, [newCity])
  const submit = () => {
    axiosInstance
      .post("/api/location", newLocation)
      .then((res) => {
        setLocationArr([...locationArr, res.data])
        setIsEntered(false)
      })
  }

  return (
    <>
      <div className="display-flex-column">
        <FormControl
          className="form-field margin-bottom-5px"
          onChange={(e) => setCountry(e.target.value)}
          id="country"
          placeholder="country"
          disabled={!isEntered}
        />
        <FormControl
          placeholder="city"
          className="form-field margin-bottom-5px"
          id="city"
          name="city"
          disabled={!isEntered}
          onChange={(e) =>
            setNewCity({
              name: e.target.value,
              country: {
                name: country,
              },
            })
          }
        />
        <FormControl
          placeholder="addresses"
          className="form-field margin-bottom-5px"
          id="addresses"
          name="addresses"
          value={newLocation.address ? newLocation.address : ""}
          disabled={!isEntered}
          onChange={(e) =>
            setNewLocation({ ...newLocation, address: e.target.value })
          }
        />
        <Button
          className="margin-bottom-5px"
          variant="primary"
          onClick={() => submit()}
          disabled={!isEntered}
        >
          Apply
        </Button>
      </div>
    </>
  )
}

export default CreateLocation

CreateLocation.propTypes = {
  setLocationArr: PropTypes.func,
  locationArr: PropTypes.array,
}
