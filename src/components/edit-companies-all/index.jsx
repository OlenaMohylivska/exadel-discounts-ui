import React, { useState, useEffect, useContext } from "react"
import axiosInstance from "components/api"

import { Button, Spinner } from "react-bootstrap"
import CompanyInfo from "components/companyInfo"
import "./styles.scss"
import { Redirect } from "react-router-dom"
import { Context } from "store/context"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const EditCompaniesAll = () => {
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState([])
  const [newCompany, setNewCompany] = useState(false)
  const [companiesFetchError, setCompaniesFetchError] = useState(null)
  const { bindToken } = useContext(Context)
  const [search, setSearch] = useState({
    pageNum: 0,
    itemsPerPage: 10
  })
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (isSearching) {
      axiosInstance
        .post("/api/company/search", search)
        .then((res) => setCompanies(res.data.content))
      setLoading(false)
      setIsSearching(false)
    } else {
      return
    }
  }, [isSearching])

  useEffect(() => {
    bindToken()
  }, [])

  const fetchData = async (url, setFunc) => {
    try {
      setLoading(true)
      await axiosInstance
        .get(baseUrl + url)
        .then((response) => setFunc(response.data))
      setLoading(false)
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

  /* const handleSearchText = (event) => {
    setSearch({...search, searchText: event.target.value})
    setTimeout(funcDebouncer, 2000)
  } */

  const funcDebouncer = () => {
    setIsSearching(true)
    setLoading(true)
  }

  return (
    <div className="container">
      <div className="col-lg-12 col-md-12 my-4 search-container-wrapper justify-content-between">
        <div className="col-lg-2 col-md-3 text-end">
          <Button
            variant="primary"
            className="add-discount-btn px-2"
            onClick={addNewCompanyHandler}
          >
            Add new company
          </Button>
        </div>
      </div>

      {loading && (
        <div className="spin-container">
          <Spinner className="spin-loader" animation="border" variant="info" />
        </div>
      )}

      {newCompany ? <Redirect to="/admin/add-company" /> : ""}
      {companies && (
        <div className="companies-wrapper">
          {companies.map((elem) => {
            return <CompanyInfo key={elem.id} elem={elem} />
          })}
        </div>
      )}
      {companiesFetchError && (
        <div className="fetch-error-info">
          Sorry no info, {companiesFetchError}
        </div>
      )}
    </div>
  )
}

export default EditCompaniesAll
