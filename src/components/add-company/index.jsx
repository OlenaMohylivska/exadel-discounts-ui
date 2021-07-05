import React, { useEffect, useState, useMemo } from "react"
import { Button, Form, FormControl, InputGroup, Toast } from "react-bootstrap"
import Select from "react-select"
import PropTypes from "prop-types"
import axios from "axios"
import CustomModalWindow from "components/custom-modal-window"
import "./styles.scss"
import FileUploadPage from "components/upload-file"
import { useHistory } from "react-router-dom"

const AddCompany = (props) => {
  const [allLocationList, setAllLocationList] = useState([])
  const [companyName, setCompanyName] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const [companyPostError, setCompanyPostError] = useState({
    error: null,
    show: false,
  })

  const history = useHistory()

  const citiesOptions = useMemo(() => {
    return allLocationList.map((location) => ({
      ...location,
      label: location.city,
      value: location.city,
    }))
  }, [allLocationList])

  const countryOptions = [
    {
      label: "Ukraine",
      value: "Ukraine",
    },
    {
      label: "Belarus",
      value: "Belarus",
    },
  ]

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_BACKEND_URL}/api/location`
    axios.get(apiUrl).then((resp) => {
      setAllLocationList(resp.data)
    })
  }, [])

  useEffect(() => {
    if (props.isEdit) {
      setCompanyName(props.company.name)
      setCity(
        props.company.locations.map((el) => ({
          ...el,
          value: el.city,
          label: el.city,
        }))
      )
    }
  }, [])

  function deleteCompany(id) {
    axios.delete(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/company/${id}`)
  }

  async function saveCompanyChanges(id) {
    try {
      axios.put(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/company/${id}`, {
        id: id,
        modified: null,
        modifiedBy: null,
        name: companyName,
        locations: location.map((el) => ({ ...el })),
      })
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
    setCity(e)
  }

  const companyCountryHandler = (e) => {
    setCountry(e)
  }

  return (
    <Form>
      <div className="container">
        <div className="col">
          <div className="company-logo">
            <FileUploadPage />
          </div>
          <div className="company-additional-info">
            <div className="company-name">
              <h4 className="company-info-subtitle">Company Name</h4>
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
                  onChange={companyNameHandler}
                  className="form-field"
                />
              </InputGroup>
            </div>
            <div className="company-address ">
              <h4 className="company-info-subtitle">Country</h4>
              <Select
                value={props.isEdit && country}
                className="address-field"
                onChange={companyCountryHandler}
                options={countryOptions}
                required
              />
              <h4 className="company-info-subtitle">City</h4>
              <Select
                value={props.isEdit && city}
                className="address-field"
                isMulti
                onChange={companyCityHandler}
                options={citiesOptions}
              />
              <h4 className="company-info-subtitle">Address</h4>
              <InputGroup>
                <FormControl
                  value={address}
                  name="company-address"
                  onChange={companyAddressHandler}
                  className="form-field"
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
