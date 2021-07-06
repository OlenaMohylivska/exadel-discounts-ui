import React, { useState, useEffect, useMemo, useContext } from "react"
import ProductCard from "components/product-card"
import { Form, Container } from "react-bootstrap"
import Loupe from "components/icons/Loupe"
import Select from "react-select"
import * as axios from "axios"
import "./styles.scss"
import { Context } from "store/context"
import FetchError from "components/fetch-error"
import Pagination from "components/pagination"

const Catalog = () => {
  const cardImages = useContext(Context)
  const [discounts, setDiscounts] = useState([])
  const [searchLocation, setSearchLocation] = useState([])
  const [filterTags, setFilterTags] = useState([])
  const [searchCompanies, setSearchCompanies] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  const fetchData = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_BACKEND_URL + "/api/discounts")
      .then((response) => setDiscounts(() =>
        response.data.map((el, index) => ({
          ...el,
          img: cardImages[index],
        }))
      )).catch(err => setFetchError(err.message))
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/location"
    axios.get(apiUrl).then((resp) => {
      setSearchLocation(resp.data)
    }).catch(err => setFetchError(err.message))
  }, [])

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/tags/"
    axios.get(apiUrl).then((res) => {
      setFilterTags(res.data)
    }).catch(err => setFetchError(err.message))

  }, [])
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/company"
    axios.get(apiUrl).then((res) => {
      setSearchCompanies(res.data)
    }).catch(err => setFetchError(err.message))

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

  const citiesOptions = useMemo(() => {
    return searchLocation.map((location) => ({
      label: location.city,
      value: location.city,
    }))
  }, [searchLocation])

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

  const handleSortingOption = (option) => {
    if (option.value === "Top rated") {
      const sortedArr = [...discounts]
      sortedArr.sort((a, b) => a.rate < b.rate ? 1 : -1)
      setDiscounts(sortedArr)
    }
  }

  return (
    <>
      {fetchError ? <FetchError error={fetchError} /> :
        <Container className="catalog-wrapper">
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

            <div className=" catalog-filters width-100">
              <Select
                className="catalog-selects"
                options={citiesOptions}
                placeholder="Location"
              />{" "}
              <Select
                className="catalog-selects"
                options={companiesOptions}
                placeholder="Companies"
              />
              <Select
                className="catalog-selects"
                isMulti
                options={categoriesOptions}
                placeholder="Categories"
              />
              <Select
                className="catalog-selects"
                options={sortingOptions}
                onChange={(option) => handleSortingOption(option)}
                placeholder="Sorting by..."
              />
            </div>
          </div>

          <div className="discounts-wrapper">
            {discounts.slice(0, itemsPerPage).map((el) => {
              return <ProductCard elem={el} key={el.id} />
            })}
          </div>
          <Pagination
            discounts={discounts}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </Container>
      }
    </>
  )
}

export default Catalog
