import React, { useState, useEffect } from "react"
import axiosInstance from "components/api"
import Loupe from "components/icons/Loupe"
import { Form, Button } from "react-bootstrap"
import CompanyInfo from "components/companyInfo"
import "./styles.scss"
// import AddCompany from "components/add-company"
import { Redirect } from "react-router-dom"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const EditCompaniesAll = () => {
  const [companies, setCompanies] = useState(null)
  const [newCompany, setNewCompany] = useState(false)
  const [companiesFetchError, setCompaniesFetchError] = useState(null)

  const fetchData = async (url, setFunc) => {
    try {
      await axiosInstance
        .get(baseUrl + url)
        .then((response) => setFunc(response.data))
    } catch (e) {
      setCompaniesFetchError(e.message)
    }
  }

  useEffect(() => {
    fetchData("/api/company", setCompanies)
  }, [])

  const addNewCompanyHandler = () => {
    setNewCompany(!newCompany)
  }
  const token = localStorage.getItem("jwt") && localStorage.getItem("jwt")
  useEffect(() => {
    axiosInstance.interceptors.request.use((config) => {
      token ? (config.headers.Authorization = token) : config
      return config
    })
  }, [])

  return (
    <div className="container">
      <div className="row mt-5">
        <div className=" filter-panel column ">
          <div className="width-100">
            <label className="col-lg-5 col-md-12 search-container padding-right-12px ">
              <div className="search-icon">
                <Loupe />
              </div>
              <Form className="search-input">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Enter your search" />
                </Form.Group>
              </Form>
            </label>
          </div>
        </div>
        <div className="btn-wrapper d-flex justify-content-center">
          <Button
            variant="primary"
            className="h-100 px-4 align-self-center"
            onClick={addNewCompanyHandler}
          >
            Add new company
          </Button>
        </div>

        {newCompany ? <Redirect to="/admin/add-company" /> : ""}
        {companies ? (
          <div className="companies-wrapper">
            {companies.map((company) => {
              return (
                <CompanyInfo
                  key={company.id}
                  name={company.name}
                  id={company.id}
                />
              )
            })}
          </div>
        ) : (
          <div className="fetch-error-info">
            Sorry no info, {companiesFetchError && companiesFetchError}
          </div>
        )}
      </div>
    </div>
  )
}

export default EditCompaniesAll
