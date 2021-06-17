import React, { useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import "./styles.scss"
import PropTypes from "prop-types"

const AddCompany = () => {
  const [serviceDescription, setServiceDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [locationUA, setLocationUA] = useState("")
  const [locationBLR, setLocationBLR] = useState("")
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
    setLocationUA(e.target.value)
  }

  const companyBLRAddressHandler = (e) => {
    setLocationBLR(e.target.value)
  }

  const logoChangeHandler = (e) => {
    setLogo(e.target.value)
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
                  placeholder="Discount provider UA address (city)"
                  name="company-UAaddress"
                  onChange={companyUAAddressHandler}
                  className="form-field address-field"
                  defaultValue={locationUA}
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  placeholder="Discount provider BLR address (city)"
                  name="company-BLRaddress"
                  onChange={companyBLRAddressHandler}
                  className="form-field address-field"
                  defaultValue={locationBLR}
                />
              </InputGroup>
            </div>
          </div>
          <div className="btn-field">
            <Button variant="primary" className="btn company-info-btn">
              Save company info
            </Button>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AddCompany

AddCompany.propTypes = { display: PropTypes.bool, setDisplay: PropTypes.func }
