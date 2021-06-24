import React, { useState, useEffect, useMemo } from "react"
import ProductCard from "components/product-card"
import { Form, Container } from "react-bootstrap"
import FetchError from "components/fetch-error"
import Loupe from "components/icons/Loupe"
import Select from "react-select"
import * as axios from "axios"
import "./styles.css"

const Catalog = () => {
  const [discounts, setDiscounts] = useState(null)
  const [searchLocation, setSearchLocation] = useState([])

  const fetchData = async () => {
    axios
      .get(process.env.REACT_APP_BASE_BACKEND_URL + "/api/discounts/all")
      .then((response) => setDiscounts(response.data))
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/location/all"
    axios.get(apiUrl).then((resp) => {
      setSearchLocation(resp.data)
    })
  }, [])

  const categories = ["Food", "SPA", "Sport", "Entertainment"]

  const sortingByRate = ["Top rated"]

  const citiesOptions = useMemo(() => {
    return searchLocation.map((location) => ({
      label: location.city,
      value: location.city,
    }))
  }, [searchLocation])

  const categoriesOptions = categories.map((el) => {
    return {
      value: el,
      label: el,
    }
  })

  const sortingOptions = sortingByRate.map((el) => {
    return {
      value: el,
      label: el,
    }
  })

  return (
    <Container>
      <h1 className='catalog-title'>Catalog</h1>
      <div className='row filter-panel'>
        <label className='col-lg-5 col-md-12 search-container'>
          <div className='search-icon'>
            <Loupe />
          </div>
          <Form className='search-input'>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Control type='text' placeholder='Enter your search' />
            </Form.Group>
          </Form>
        </label>
        <div className='catalog-filters col-lg-7 col-md-12'>
          <Select
            className='catalog-selects'
            options={citiesOptions}
            placeholder='Location'
          />
          <Select
            className='catalog-selects'
            isMulti
            options={categoriesOptions}
            placeholder='Categories'
          />
          <Select
            className='catalog-selects'
            options={sortingOptions}
            placeholder='Sorting by...'
          />
        </div>
      </div>
      <div className='discounts-wrapper'>
        {discounts ? (
          discounts.map((el) => {
            return <ProductCard elem={el} key={el.id} />
          })
        ) : (
          <FetchError />
        )}
      </div>
    </Container>
  )
}

export default Catalog
