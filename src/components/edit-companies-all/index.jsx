import React, { useState, useEffect } from "react"
import * as axios from "axios"
import Loupe from "components/icons/Loupe"
import { Form } from "react-bootstrap"
import CompanyInfo from "components/companyInfo"
import "./styles.scss"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const EditCompaniesAll = () => {
  const [companies, setCompanies] = useState([])

  const fetchData = async (url, setFunc) => {
    axios.get(baseUrl + url).then((response) => setFunc(response.data))
  }

  useEffect(() => {
    fetchData("/api/company/all", setCompanies)
  }, [])

  return (
    <div className="container">
      <div className="row mt-5">
        <label className="col-lg-5 col-md-12 search-container">
          <div className="search-icon ">
            <Loupe />
          </div>
          <Form className="search-input ">
            <Form.Group controlId="control-input ">
              <Form.Control type="text" placeholder="Enter your search" />
            </Form.Group>
          </Form>
        </label>
        {companies.map((company) => (
          <CompanyInfo key={company.id} name={company.name} />
        ))}
      </div>
    </div>
  )
}

export default EditCompaniesAll
