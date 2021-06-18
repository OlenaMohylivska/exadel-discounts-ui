import React, { useEffect, useState, useMemo } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import Select from 'react-select'
import PropTypes from "prop-types"
import axios from "axios"
import CustomModalWindow from "components/custom-modal-window"
import "./styles.scss"
import FileUploadPage from "components/upload-file"

const AddCompany = (props) => {
  const [allLocationList, setAllLocationList] = useState([])
  const [serviceDescription, setServiceDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [location, setLocation] = useState("")
  const [show, setShow] = useState(false)
  const onModalClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const citiesOptions = useMemo(() => {
    return allLocationList.map(location => ({ ...location, label: location.city, value: location.city }))
  }, [allLocationList])

  useEffect(() => {
    const apiUrl = "https://sandbox-team5.herokuapp.com/api/location/all"
    axios.get(apiUrl)
      .then((resp) => {
        setAllLocationList(resp.data)
      })
  }, [])

  useEffect(() => {
    if (props.isEdit) {
      setCompanyName(props.company.name)
      setLocation(props.company.locations.map(el => ({
        ...el,
        value: el.city,
        label: el.city
      })))
    }
  }, [])

  function deleteCompany(id) {
    axios.delete(`https://sandbox-team5.herokuapp.com/api/company/${id}`)
  }

  function saveCompanyChanges(id) {
    axios.put(`https://sandbox-team5.herokuapp.com/api/company/${id}`,
      {
        "id": id,
        "modified": null,
        "modifiedBy": null,
        "name": companyName,
        "locations": location.map(el => ({ ...el }))
      }
    )
  }

  const companyDecriptionHandler = (e) => {
    setServiceDescription(e.target.value)
  }

  const companyNameHandler = (e) => {
    setCompanyName(e.target.value)
  }

  const companyAddressHandler = (e) => {
    setLocation(e)
  }

  return (
    <Form>
      <div className="container">
        <div className="col">
          <div className="company-logo">
            <FileUploadPage />
          </div>
          <div className="company-additional-info">
            <div className="service-description">
              <h3 className="company-info-subtitle">
                Description of a service or product
              </h3>
              <InputGroup>
                <FormControl
                  as="textarea"
                  defaultValue={serviceDescription}
                  name="service-description"
                  onChange={companyDecriptionHandler}
                  className="company-info-textarea"
                />
              </InputGroup>
            </div>
            <div className="company-name">
              <h4 className="company-info-subtitle">Company Name</h4>
              <InputGroup>
                <FormControl
                  value={companyName}
                  name="company-name"
                  onChange={companyNameHandler}
                  className="form-field"
                />
              </InputGroup>
            </div>
            <div className="company-address ">
              <h4 className="company-info-subtitle">Address</h4>
              <Select
                value={props.isEdit && location}
                className="address-field"
                isMulti
                onChange={companyAddressHandler}
                options={citiesOptions} />
            </div>
          </div>
          <div className="btn-field d-flex justify-content-start">
            <Button
              variant="primary"
              className="btn company-info-btn"
              onClick={() => saveCompanyChanges(props.company.id)}>
              Save company info
            </Button>
            {props.isEdit ? <Button
              variant="danger"
              className="btn company-info-btn mx-3"
              onClick={() => {
                handleShow()
                deleteCompany(props.company.id)
              }}>
              Delete company
            </Button> : null}
          </div>
        </div>
      </div>
      {props.isEdit
        && <CustomModalWindow
          show={show}
          handleClose={onModalClose}
          modalText="Company has been deleted" />}
    </Form>

  )
}

export default AddCompany

AddCompany.propTypes = {
  display: PropTypes.bool,
  setDisplay: PropTypes.func,
  isEdit: PropTypes.bool,
  company: PropTypes.object,
  setCompany: PropTypes.func
}
