import React, { useEffect, useState, useMemo, useContext } from "react"
import { Button, Form, FormControl, InputGroup, Toast } from "react-bootstrap"
import Select from "react-select"
import PropTypes from "prop-types"
import axiosInstance from "components/api"
import CustomModalWindow from "components/custom-modal-window"
import "./styles.scss"
import FileUploadPage from "components/upload-file"
import { useHistory } from "react-router-dom"
import AddLocation from "../add-location"
import { Context } from "store/context"
import ToastElement from "components/toast"

const AddCompany = (props) => {
  const [data, setData] = useState({
    name: "",
    countries: [],
    imageId: null,
  })
  const [allLocationList, setAllLocationList] = useState([])
  const [actualLocation, setActualLocation] = useState([
    {
      name: "",
      cities: [],
    },
  ])
  const [newLocationsArr, setNewLocationsArr] = useState([{ id: 0 }])
  const { bindToken } = useContext(Context)
  const [countryLocation, setCountryLocation] = useState([])
  const [citiesLocation, setCitiesLocation] = useState([])
  const [fileId, setFileId] = useState(null)

  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const [companyPostError, setCompanyPostError] = useState({
    error: null,
    show: false,
  })
  const [successMessage, setSuccessMessage] = useState(false)

  const history = useHistory()
  useEffect(() => {
    bindToken()
  }, [])

  const locationOptions = useMemo(() => {
    return (
      allLocationList.length > 0 &&
      allLocationList.map((country) => ({
        label: country.name,
        value: country.name,
        id: country.id,
        cities: country.cities,
      }))
    )
  }, [allLocationList])

  const handleChange = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value })
  }
  const locationHandleChange = (e) => {
    setCountryLocation(e.cities)
    setActualLocation([{ name: e.value, id: e.id }])
  }
  const addNewLocation = () => {
    setNewLocationsArr([...newLocationsArr, { id: newLocationsArr.length + 1 }])
  }
  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_BASE_BACKEND_URL}/api/location`
    axiosInstance.get(apiUrl).then((resp) => {
      setAllLocationList(resp.data)
    })
  }, [])

  useEffect(() => {
    if (props.isEdit) {
      setData(props.company)
    }
  }, [])
  useEffect(() => {
    setActualLocation([{ ...actualLocation[0], cities: citiesLocation }])
  }, [citiesLocation])

  useEffect(() => {
    setData({ ...data, countries: actualLocation })
  }, [actualLocation])

  useEffect(() => {
    setData({ ...data, imageId: fileId })
  }, [fileId])
  const token = localStorage.getItem("jwt") && localStorage.getItem("jwt")
  useEffect(() => {
    axiosInstance.interceptors.request.use((config) => {
      token ? (config.headers.Authorization = token) : config
      return config
    })
  }, [])

  function deleteCompany(id) {
    axiosInstance.delete(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/api/company/${id}`
    ).then(() => setSuccessMessage(true))
  }

  const reset = () => {
    setData({
      name: "",
      countries: [],
      imageId: null,
    })
  }

  async function saveCompanyInfo() {
    try {
      axiosInstance.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/company`,
        data
      ).then(() => setSuccessMessage(true))
      reset()
    } catch (e) {
      setCompanyPostError({ error: e.message, show: true })
    }
  }
  async function updateCompanyInfo() {
    try {
      axiosInstance.put(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/company/${props.company.id}`,
        data
      ).then(() => setSuccessMessage(true))
    } catch (e) {
      setCompanyPostError({ error: e.message, show: true })
    }
  }

  const getLocation = (
    <>
      <div className="address-field company-info-subtitle">Location </div>
      {locationOptions && locationOptions.length > 0 ? (
        <div className="d-flex flex-row">
          <Select
            options={locationOptions}
            onChange={(e) => locationHandleChange(e)}
            placeholder="Country"
            className="w-100"
          />
          <Button className="add-location-btn" onClick={() => addNewLocation()}>✚</Button>
        </div>
      ) : (
        ""
      )}
      {newLocationsArr.map((elem) => (
        <AddLocation
          key={elem.id}
          countryLocation={countryLocation}
          citiesLocation={citiesLocation}
          setCitiesLocation={setCitiesLocation}
        />
      ))}
    </>
  )

  return (
    <Form>
      <div className="container my-4 company-container">
        <div className="col">
          <div className="company-logo">
            <FileUploadPage setFileId={setFileId} />
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
                  value={data.name ?? ""}
                  name="name"
                  id="name"
                  onChange={(e) => handleChange(e)}
                  className="form-field"
                />
              </InputGroup>
            </div>
            {getLocation}
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
                className="btn company-info-btn"
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
            {props.isEdit ? (
              <Button
                variant="danger"
                className="btn company-info-btn"
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
        {successMessage && <ToastElement setSuccessMessage={setSuccessMessage} />}
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
