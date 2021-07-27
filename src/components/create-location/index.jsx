import React, { useState, useEffect } from "react"
import { FormControl, Button } from "react-bootstrap"
import axiosInstance from "components/api"
import PropTypes from "prop-types"
import "./styles.scss"
const CreateLocation = ({ country, setLocationArr, locationArr }) => {
  const [newLocation, setNewLocation] = useState({ address: null, city: {} })
  const [newCity, setNewCity] = useState({})
  useEffect(() => {
    setNewLocation({ city: newCity })
  }, [newCity])
  const submit = () => {
    axiosInstance
      .post("/api/location", newLocation)
      .then((res) => setLocationArr([...locationArr, res.data]))
  }

  return (
    <>
      <div className="display-flex-column">
        <FormControl
          placeholder="city"
          className="form-field margin-bottom-5px"
          id="city"
          name="city"
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
          onChange={(e) =>
            setNewLocation({ ...newLocation, address: e.target.value })
          }
        />
        <Button
          className="margin-bottom-5px"
          variant="primary"
          onClick={() => submit()}
        >
          Apply
        </Button>
      </div>
    </>
  )
}

export default CreateLocation

CreateLocation.propTypes = {
  country: PropTypes.string,
  setLocationArr: PropTypes.func,
  locationArr: PropTypes.array,
}
