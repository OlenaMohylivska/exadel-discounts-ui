import React, { useEffect, useState, useMemo } from "react"
import { Button, Form, FormControl, InputGroup, Toast } from "react-bootstrap"
import Select from "react-select"
import PropTypes from "prop-types"
import { axiosInstance } from "components/api"
import CustomModalWindow from "components/custom-modal-window"
import "./styles.scss"
import FileUploadPage from "components/upload-file"
import { useHistory } from "react-router-dom"

const AddCompany = (props) => {
  const [allLocationList, setAllLocationList] = useState([])
  const [companyName, setCompanyName] = useState("")
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState("")
  const [address, setAddress] = useState("")
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const [companyPostError, setCompanyPostError] = useState({
    error: null,
    show: false,
  })

  const history = useHistory()

  const countryOptions = useMemo(() => {
    return allLocationList.map((location) => ({
      ...location,
      label: location.name,
      value: location.name,
    }))
  }, [allLocationList])

  const citiesOptions = useMemo(() => {
    return cities.map((city) => ({
      ...city,
      label: city,
      value: city,
    }))
  }, [cities])

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_BACKEND_URL}/api/location`
    axios.get(apiUrl).then((resp) => {
      setAllLocationList(resp.data)
    })
  }, [])


  useEffect(() => {
    if (props.isEdit) {
      setCompanyName(props.company.name)
      setCities(
        props.company.countries.map((location) => ({
          ...location,
          value: location.cities.name,
          label: location.cities.name,
        }))
      )
    }
  }, [])

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_BACKEND_URL}/api/location`
    axios.get(apiUrl).then((resp) => {
      setCountries(resp.data)
    })
  }, [])

  function deleteCompany(id) {
    axiosInstance.delete(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/api/company/${id}`
    )
  }

  async function saveCompanyChanges(id) {
    try {
      axiosInstance.put(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/company/${id}`,
        {
          id: id,
          modified: null,
          modifiedBy: null,
          name: companyName,
          locations: location.map((el) => ({ ...el })),
        }
      )
    } catch (e) {
      setCompanyPostError({ error: e.message, show: true })
    }
  }

  const companyNameHandler = (e) => {
    setCompanyName(e.target.value)
  }

  const companyAddressHandler = (e) => {
    setAddress(e.target.value)
  }

  const companyCityHandler = (e) => {
    setCities(e)
  }

  const companyCountryHandler = (e) => {
    setCountries(e)
    setCities(e.cities.map(city => city.name))
  }

  return (
    <Form>
      <div className="container d-flex flex-row-reverse align-items-start pt-5">
        <div className="col">
          <div className="company-logo">
            <FileUploadPage />
          </div>
          <div className="company-additional-info">
            <div className="company-name">
              <label className="company-info-subtitle" htmlFor="name">Company Name</label>
              <InputGroup>
                <Toast
                  show={companyPostError.show}
                  autohide
                  onClose={() => {
                    setCompanyPostError({ show: false, error: null })
                  }}
                >
                  <Toast.Body>{companyPostError.error}</Toast.Body>
                </Toast>
                <FormControl
                  value={companyName}
                  name="company-name"
                  id="name"
                  onChange={companyNameHandler}
                  className="form-field"
                />
              </InputGroup>
            </div>
            <div className="company-address ">
              <label className="company-info-subtitle" htmlFor="country">Country</label>
              <Select
                value={props.isEdit && country}
                className="address-field"
                onChange={companyCountryHandler}
                options={countryOptions}
                required
                inputId="country"
              />
              <label className="company-info-subtitle" htmlFor="city">City</label>
              <Select
                value={props.isEdit && city}
                className="address-field"
                isMulti
                onChange={companyCityHandler}
                options={citiesOptions}
                inputId="city"
              />
              <label className="company-info-subtitle" htmlFor="address">Address</label>
              <InputGroup>
                <FormControl
                  value={address}
                  name="company-address"
                  onChange={companyAddressHandler}
                  className="form-field"
                  id="address"
                />
              </InputGroup>
            </div>
          </div>
          <div className="btn-field d-flex justify-content-between">
            <Button
              variant="primary"
              className="btn company-info-btn"
              onClick={() => saveCompanyChanges(props.company.id)}
            >
              Save company info
            </Button>
            {props.isEdit ? (
              <Button
                variant="secondary"
                className="btn company-info-btn"
                onClick={() => {
                  history.goBack()
                }}
              >
                Go back to admin panel
              </Button>
            ) : null}
            {props.isEdit ? (
              <Button
                variant="danger"
                className="btn company-info-btn mx-3"
                onClick={() => {
                  toggleModal()
                  deleteCompany(props.company.id)
                }}
              >
                Delete company
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      {props.isEdit && (
        <CustomModalWindow
          show={show}
          handleClose={toggleModal}
          modalText="Company has been deleted"
        />
      )}
    </Form>
  )
}

export default AddCompany

AddCompany.propTypes = {
  display: PropTypes.bool,
  setDisplay: PropTypes.func,
  isEdit: PropTypes.bool,
  company: PropTypes.object,
  setCompany: PropTypes.func,
}
