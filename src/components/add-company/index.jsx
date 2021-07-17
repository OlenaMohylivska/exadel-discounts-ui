import React, { useEffect, useState, useMemo } from "react"
import { Button, Col, Form, FormControl, InputGroup, Toast, Container } from "react-bootstrap"
import Select from "react-select"
import PropTypes from "prop-types"
import axiosInstance from "components/api"
import "./styles.scss"
import FileUploadPage from "components/upload-file"
import { useHistory } from "react-router-dom"

const AddCompany = (props) => {
  const [allLocationList, setAllLocationList] = useState([])
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState("")
  const [addresses, setAddresses] = useState("")

  const [companyName, setCompanyName] = useState("")
  const [city, setCity] = useState({})
  const [country, setCountry] = useState({})
  const [address, setAddress] = useState([])
  const [companyPostError, setCompanyPostError] = useState({
    error: null,
    show: false,
  })
  const [imageName, setImageName] = useState(null)
  const [requestIsDone, setRequestIsDone] = useState(false)
  const history = useHistory()

  const countryOptions = useMemo(() => {
    return (
      allLocationList.length > 0 &&
      allLocationList.map((location) => ({
        ...location,
        label: location.name,
        value: location.name,
      }))
    )
  }, [allLocationList])

  const citiesOptions = useMemo(() => {
    return (
      cities.length > 0 &&
      cities.map((city) => ({
        ...city,
        label: city.name,
        value: city.name,
      }))
    )
  }, [countries])

  const addressOptions = useMemo(() => {
    return (
      addresses.length > 0 &&
      addresses.map((address) => ({
        ...address,
        label: address.address,
        value: address.address,
      }))
    )
  }, [cities])

  useEffect(() => {
    axiosInstance.get('/api/location').then((resp) => {
      setAllLocationList(resp.data)
    })
  }, [countries])


  useEffect(() => {
    if (props.isEdit) {
      setCompanyName(props.company.name)
      setCountry(props.company.countries[0])
      setCity(props.company.countries[0].cities[0])
      setAddress(props.company.countries[0].cities[0].addresses.map(address => ({
        ...address,
        label: address.address,
        value: address.address
      })))
      setImageName(props.company.nameImage || null)
    }
  }, [])

  function deleteCompany(id) {
    axiosInstance.delete(`/api/company/${id}`)
      .then(() => reset())
      .catch(e => setCompanyPostError({ error: e.message, show: true }))
    history.goBack()
  }

  const reset = () => {
    setCompanyName("")
    setCountries("")
    setCities("")
    setCity("")
    setCountry("")
    setAddresses("")
    setAddress("")
    setAllLocationList("")
    setImageName(null)
    setRequestIsDone(false)
  }

  async function saveCompanyInfo() {
    try {
      axiosInstance.post(`/api/company`, {
        name: companyName,
        nameImage: imageName,
        countries: [{
          name: country.name,
          id: country.id,
          cities: [{
            name: city.name,
            id: city.id,
            addresses: address.map(item => ({ address: item.address, id: item.id }))
          }]
        }]
      }
      ).then(() => setRequestIsDone(true))
      reset()
    } catch (e) {
      setCompanyPostError({ error: e.message, show: true })
    }
  }


  async function updateCompanyInfo() {
    console.log(imageName)
    try {
      console.log(imageName)
      console.log(addresses)
      axiosInstance.put(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/company/${props.company.id}`,
        {
          name: companyName,
          nameImage: imageName || "",
          countries: [{
            name: country.name,
            id: country.id,
            cities: [{
              name: city.name,
              id: city.id,
              addresses: address.map(item => ({ address: item.address, id: item.id }))
            }]
          }]
        }
      ).then(() => setRequestIsDone(true))
      reset()
    } catch (e) {
      setCompanyPostError({ error: e.message, show: true })
    }
  }

  const companyNameHandler = (e) => {
    setCompanyName(e.target.value)
  }

  const companyAddressHandler = (e) => {
    setAddress(e)
  }

  const companyCityHandler = (e) => {
    setCities(e)
    setAddresses(e.addresses)
    setCity({ name: e.name, id: e.id })
    setAddress([])
  }

  const companyCountryHandler = (e) => {
    setCountries(e)
    setCities(e.cities)
    setCountry({ name: e.name, id: e.id })
    setCity({})
    setAddress([])
    setAddresses([])
  }

  return (
    <Form>
      <Container className="add-company-container pt-5">
        <Col md={6} sm={12} xs={12}>
          <div className="company-logo">
            <FileUploadPage setRequestIsDone={setRequestIsDone} requestIsDone={requestIsDone} setImageName={setImageName} />
          </div>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <div className="company-additional-info">
            <div className="company-name">
              <label className="company-info-subtitle" htmlFor="name">
                Company Name
              </label>
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
              <label className="company-info-subtitle" htmlFor="country">
                Country
              </label>
              <Select
                value={{ value: country.name, label: country.name }}
                className="address-field"
                onChange={companyCountryHandler}
                options={countryOptions}
                required
              />
              <label className="company-info-subtitle" htmlFor="city">
                City
              </label>
              <Select
                value={{ value: city.name, label: city.name }}
                className="address-field"
                onChange={companyCityHandler}
                options={citiesOptions}
              />
              <label className="company-info-subtitle" htmlFor="address">
                Address
              </label>
              <Select
                value={address}
                className="address-field"
                onChange={companyAddressHandler}
                options={addressOptions}
                placeholder=""
                isMulti
              />
            </div>
          </div>

          <div className="btn-field d-flex justify-content-between">
            {props.isEdit ? (
              <Button
                variant="primary"
                className="btn company-info-btn"
                onClick={() => updateCompanyInfo()}
              >
                Update company info
              </Button>
            ) : (
              <Button
                variant="primary"
                className="btn company-info-btn"
                onClick={saveCompanyInfo}
              >
                Save company info
              </Button>
            )}
            {props.isEdit ? (
              <Button
                variant="danger"
                className="btn company-info-btn mx-3"
                onClick={() => {
                  deleteCompany(props.company.id)
                }}
              >
                Delete company
              </Button>
            ) : null}
          </div>
        </Col>
      </Container>
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