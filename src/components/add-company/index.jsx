import React, { useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import "./styles.css"
import PropTypes from "prop-types"

const AddCompany = ({ display, setDisplay }) => {
  const [serviceDescription, setServiceDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [location, setLocation] = useState("")
  const [phone, setPhone] = useState("")
  const [logo, setLogo] = useState(
    "https://www.pngfind.com/pngs/m/665-6659827_enterprise-comments-default-company-logo-png-transparent-png.png"
  )

  const companyDecriptionHandler = (e) => {
    setServiceDescription(e.target.value)
  }

  const companyNameHandler = (e) => {
    setCompanyName(e.target.value)
  }

  const companyUAAddressHandler = (e) => {
    setLocation(e.target.value)
  }

  const companyBLRAddressHandler = (e) => {
    setLocation(e.target.value)
  }

  const logoChangeHandler = (e) => {
    setLogo(e.target.value)
  }

  const companyPhoneHandler = (e) => {
    setPhone(e.target.value)
  }

  return (
    <Form>
      <div className="container">
        <div className="col">
          <div className="company-logo">
            <img className="corporate-logo" src={logo} />
            <label htmlFor="logo-file">Company logo</label>
            <input
              type="file"
              name="url"
              className="form-control-file"
              id="logo-file"
              text="upload logo"
              onChange={logoChangeHandler}
            />
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
              <InputGroup>
                <FormControl
                  placeholder="Discount provider UA address (country, city, street)"
                  name="company-UAaddress"
                  onChange={companyUAAddressHandler}
                  className="form-field address-field"
                  defaultValue={location}
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  placeholder="Discount provider BLR address (country, city, street)"
                  name="company-BLRaddress"
                  onChange={companyBLRAddressHandler}
                  className="form-field address-field"
                  defaultValue={location}
                />
              </InputGroup>
            </div>
            <div className="company-contacts ">
              <h4 className="company-info-subtitle">Contacts</h4>
              <InputGroup>
                <FormControl
                  placeholder="Phone"
                  name="company-phone"
                  onChange={companyPhoneHandler}
                  className="form-field phone-field"
                  type="tel"
                  defaultValue={phone}
                />
              </InputGroup>
            </div>
          </div>
          <div className="btn-field">
            <Button variant="primary" className="btn company-info-btn">
              Save company info
            </Button>
            <Button
              variant="info"
              className="btn company-info-btn"
              onClick={() => {
                setDisplay(!display)
              }}
            >
              Add discount info
            </Button>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AddCompany

AddCompany.propTypes = { display: PropTypes.bool, setDisplay: PropTypes.func }
