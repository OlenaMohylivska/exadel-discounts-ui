import React, { useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import "./styles.css"

const AddCompany = () => {
  //   const [companyData, setCompanyData] = useState({})
  const [description, setDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [location, setLocation] = useState("")
  const [logo, setLogo] = useState(
    "https://www.pngfind.com/pngs/m/665-6659827_enterprise-comments-default-company-logo-png-transparent-png.png"
  )

  const companyDecriptionHandler = (e) => {
    setDescription({ [e.target.name]: e.target.value })
  }

  const companyNameHandler = (e) => {
    setCompanyName({ [e.target.name]: e.target.value })
  }

  const companyUAAddressHandler = (e) => {
    setLocation({ [e.target.name]: e.target.value })
  }

  const companyBLRAddressHandler = (e) => {
    setLocation({ [e.target.name]: e.target.value })
  }

  const logoChangeHandler = (e) => {
    setLogo({ [e.target.name]: e.target.value })
  }

  // Поки не знаємо куди відправляти ці дані
  //   const submit = () => {
  //     setCompanyData({ ...description, companyName, location, logo })
  //   }

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
                  defaultValue={description}
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
          </div>
          <div className="btn-field">
            <Button variant="primary" className="btn company-info-saveBtn">
              Save company info
            </Button>
            <Button variant="info" className="btn company-info-saveBtn">
              Add discount info
            </Button>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AddCompany
