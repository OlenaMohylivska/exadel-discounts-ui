import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from 'components/product-card'
import { Form, Button } from 'react-bootstrap'
import Loupe from 'components/icons/Loupe'
import Select from 'react-select'
import axios from 'axios'
import './styles.css'

const Catalog = () => {
  const [searchLocation, setSearchLocation] = useState(null)

  useEffect(() => {
    const apiUrl = "http://sandbox-team5.herokuapp.com/api/location/all"
    axios.get(apiUrl)
      .then((resp) => {
        const allLocations = resp.data
        setSearchLocation(allLocations)
      })
  }, [])

  const arr = [
    { title: 'Pizza' },
    { title: 'Sushi' },
    { title: 'Haircut' },
    { title: 'For pets' },
    { title: 'Dentistry' },
    { title: 'Clothes' }]

  const categories = ["Food", "SPA", "Sport", "Entertainment"]
  const sortingByRate = ["Top rated"]

  const citiesOptions = useMemo(() => {
    return searchLocation && searchLocation.map(location => ({label: location.city, value: location.city}))
  }, [searchLocation])

  const categoriesOptions = categories.map(el => {
    return {
      value: el,
      label: el
    }
  })

  const sortingOptions = sortingByRate.map(el => {
    return {
      value: el,
      label: el
    }
  })

  return (
    <div className="container">
      <h1 className="catalog-title">Catalog</h1>
      <div className="row filter-panel">
        <label className="col-lg-5 col-md-12 search-container">
          <div className="search-icon"><Loupe /></div>
          <Form className="search-input">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Enter your search" />
            </Form.Group>
          </Form>
        </label>
        <div className="catalog-filters col-lg-7 col-md-12">
          <Select
            className="catalog-selects"
            options={citiesOptions}
            placeholder="Location" />
          <Select
            className="catalog-selects"
            isMulti
            options={categoriesOptions}
            placeholder="Categories" />
          <Select
            className="catalog-selects"
            options={sortingOptions}
            placeholder="Sorting by..." />
        </div>
      </div>
      <div className="d-flex justify-content-xl-between justify-content-lg-around justify-content-md-around flex-wrap">
        {arr.map((el) => {
          return <ProductCard elem={el} key={el.title} />
        })}
      </div>
      <div className="btn-wrapper">
        <Button variant="warning">Show more</Button>
      </div>
    </div>
  )
}

export default Catalog