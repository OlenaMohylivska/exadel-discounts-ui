import React, { useState, useEffect, useMemo, useContext } from "react"
import ProductCard from "components/product-card"
import { Form, Container, Spinner } from "react-bootstrap"
import Loupe from "components/icons/Loupe"
import Select from "react-select"
import * as axios from "axios"
import "./styles.scss"
import { Context } from "store/context"

const Catalog = () => {
  const cardImages = useContext(Context)
  const [discounts, setDiscounts] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchLocation, setSearchLocation] = useState([])
  const [filterTags, setFilterTags] = useState([])
  const [searchCompanies, setSearchCompanies] = useState([])
  const [discountsFetchError, setDiscountsFetchError] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const [searchRequest, setSearchRequest] = useState({
    itemsPerPage: 10,
    locationCriteria: {},
    pageNum: 1,
    rate: 0,
    searchText: "",
    tags: [],
  })
  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }
  const searching = () => {
    setSearchRequest({ ...searchRequest, searchText: searchValue })
  }

  const handleSortChange = () => {
    setSearchRequest({
      ...searchRequest,
      orders: [{ direction: "ASC", sortBy: "rate" }],
    })
  }
  const handleChangeSearchTags = (e) => {
    setSearchRequest({ ...searchRequest, tags: e.map((elem) => elem.value) })
  }
  useEffect(() => {
    setTimeout(search(), 2000)
  }, [searchRequest])

  const fetchData = async () => {
    setLoading(true)
    try {
      await axios
        .get(process.env.REACT_APP_BASE_BACKEND_URL + "/api/discounts")
        .then((response) =>
          setDiscounts(() =>
            response.data.map((el, index) => ({
              ...el,
              img: cardImages[index],
            }))
          )
        )
      setLoading(false)
    } catch (e) {
      setDiscountsFetchError(e.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/location"
    axios.get(apiUrl).then((resp) => {
      setSearchLocation(resp.data)
    })
  }, [])

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/tags"
    axios.get(apiUrl).then((res) => {
      setFilterTags(res.data)
    })
  }, [])

  const search = async () => {
    const apiUrl =
      process.env.REACT_APP_BASE_BACKEND_URL + "/api/discounts/search"
    setLoading(true)
    try {
      axios.post(apiUrl, searchRequest).then((res) => {
        setDiscounts(res.data.content)
        setLoading(false)
      })
    } catch (e) {
      setDiscountsFetchError(e.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/company"
    axios.get(apiUrl).then((res) => {
      setSearchCompanies(res.data)
    })
  }, [])

  // const topRatedHandler = () => {
  //   const topRated = discounts.filter((el) => el.rate >= 4)
  //   setDiscounts(topRated)
  // }

  const sortingByRate = ["Top rated"]
  const companiesOptions = useMemo(() => {
    return searchCompanies.map((company) => ({
      label: company.name,
      value: company.value,
    }))
  })

  const locationOptions = searchLocation.map((location) => ({
    label: location.name,
    value: location.name,
  }))

  const categoriesOptions = filterTags.map((el) => {
    return {
      value: el.name,
      label: el.name,
    }
  })

  const sortingOptions = sortingByRate.map((el) => {
    return {
      value: el,
      label: el,
    }
  })

  return (
    <Container className="catalog-wrapper">
      <div className=" filter-panel column ">
        <div className="width-100">
          <label className="col-lg-5 col-md-12 search-container padding-right-12px ">
            <div onClick={() => searching()} className="search-icon">
              <Loupe />
            </div>
            <Form className="search-input">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  onChange={(e) => handleChangeSearchValue(e)}
                  placeholder="Enter your search"
                />
              </Form.Group>
            </Form>
          </label>
        </div>

        <div className=" catalog-filters width-100">
          <Select
            className="catalog-selects"
            options={locationOptions}
            placeholder="Location"
          />{" "}
          <Select
            className="catalog-selects"
            onChange={() => test()}
            options={companiesOptions}
            placeholder="Companies"
          />
          <Select
            className="catalog-selects"
            isMulti
            onChange={(e) => handleChangeSearchTags(e)}
            options={categoriesOptions}
            placeholder="Categories"
          />
          <Select
            className="catalog-selects"
            onChange={() => handleSortChange()}
            options={sortingOptions}
            placeholder="Sorting by..."
          />
        </div>
      </div>
      {loading && (
        <div className="large-spinner-container">
          <Spinner className="large-spinner" animation="border" role="status">
            {" "}
          </Spinner>
        </div>
      )}

      {discounts && loading === false && (
        <div className="discounts-wrapper">
          {discounts.map((el) => {
            return <ProductCard elem={el} key={el.id} />
          })}
        </div>
      )}

      {discountsFetchError ? (
        <div className="fetch-error-info">
          Sorry no info, {discountsFetchError}
        </div>
      ) : (
        ""
      )}
    </Container>
  )
}

export default Catalog
