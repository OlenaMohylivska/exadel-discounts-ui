import React, { useEffect, useState, useContext } from "react"
import { Button, Form, FormControl, InputGroup, Toast } from "react-bootstrap"
import PropTypes from "prop-types"
import axiosInstance from "components/api"
import CustomModalWindow from "components/custom-modal-window"
import "./styles.scss"
import FileUploadPage from "components/upload-file"
import { useHistory } from "react-router-dom"
import { Context } from "store/context"
import ToastElement from "components/toast"
import CreateLocation from "../create-location"

const AddCompany = (props) => {
  const [data, setData] = useState({
    name: null,
    addresses: [],
    nameImage: null,
  })
  const [locationArr, setLocationArr] = useState([])
  const [country, setCountry] = useState(null)
  const { bindToken } = useContext(Context)

  const [nameImage, setNameImage] = useState(null)

  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const [companyPostError, setCompanyPostError] = useState({
    error: null,
    show: false,
  })
  const [addNewLocation, setAddNewLocation] = useState([{ id: 0 }])

  const [successMessage, setSuccessMessage] = useState(false)
  const history = useHistory()
  useEffect(() => {
    bindToken()
  }, [])
  const handleChange = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (props.isEdit) {
      setData(props.company)
    }
  }, [])
  useEffect(() => {
    setData({ ...data, nameImage: nameImage })
  }, [nameImage])

  const reset = () => {
    setData({
      name: "",
      countries: [],
      nameImage: null,
    })
  }
  useEffect(() => {
    setData({ ...data, addresses: locationArr })
  }, [locationArr])
  async function saveCompanyInfo() {
    try {
      axiosInstance
        .post(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/company`, data)
        .then(() => setSuccessMessage(true))
      reset()
    } catch (e) {
      setCompanyPostError({ error: e.message, show: true })
    }
  }
  async function updateCompanyInfo() {
    try {
      axiosInstance
        .put(
          `${process.env.REACT_APP_BASE_BACKEND_URL}/api/company/${props.company.id}`,
          data
        )
        .then(() => setSuccessMessage(true))
    } catch (e) {
      setCompanyPostError({ error: e.message, show: true })
    }
  }
  useEffect(() => {
    if (props.company) {
      setData(props.company)
    }
  }, [props.company])
  const empty = ""
  const checkCompanyName = () => {
    if (props.company && props.company.name && !data.name) {
      return props.company.name
    }
    if (props.company && props.company.name && data.name) {
      return data.name
    }
    if (
      props.company &&
      props.company.name &&
      data.name &&
      data.name.length <= 0
    ) {
      return empty
    }
  }
  const getLocation = (
    <>
      <InputGroup className="width-100">
        <div className="display-flex-column width-100">
          <label className="company-info-subtitle" htmlFor="country">
            Location
          </label>
          <ul>
            {props.isEdit &&
              props.company.addresses.length != 0 &&
              props.company.addresses.map((elem) => (
                <li key={elem.id}>
                  {elem.address},{elem.city.name},{elem.city.country.name}
                </li>
              ))}
          </ul>
          <FormControl
            className="form-field margin-bottom-5px"
            onChange={(e) => setCountry(e.target.value)}
            id="country"
            placeholder="country"
          />
          {addNewLocation.map((elem) => (
            <CreateLocation
              key={elem.id}
              locationArr={locationArr}
              setLocationArr={setLocationArr}
              country={country}
            />
          ))}
          <Button
            onClick={() =>
              setAddNewLocation([
                ...addNewLocation,
                { id: addNewLocation.length + 1 },
              ])
            }
          >
            Add new Location
          </Button>
        </div>
      </InputGroup>
    </>
  )

  return (
    <Form>
      <div className="container my-4 company-container">
        <div className="col">
          <div className="company-logo">
            <FileUploadPage
              setNameImage={setNameImage}
              isEditable={props.isEdit}
              image={data.nameImage}
            />
          </div>
        </div>
        <div className="col company-info-wrapper">
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
                  value={checkCompanyName()}
                  name="name"
                  id="name"
                  onChange={(e) => handleChange(e)}
                  className="form-field"
                />
              </InputGroup>
            </div>
            {props.isEdit && getLocation}
          </div>

          <div className="btn-field">
            {props.isEdit ? (
              <Button
                variant="primary"
                className="btn company-info-btn"
                onClick={updateCompanyInfo}
              >
                Update company info
              </Button>
            ) : (
              <Button
                variant="primary"
                className="btn company-info-btn save-btn"
                onClick={saveCompanyInfo}
              >
                Save company info
              </Button>
            )}
            {props.isEdit ? (
              <Button
                variant="secondary"
                className="btn company-info-btn"
                onClick={() => {
                  history.goBack()
                }}
              >
                To admin panel
              </Button>
            ) : null}
          </div>
        </div>
        {successMessage && (
          <ToastElement setSuccessMessage={setSuccessMessage} />
        )}
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
