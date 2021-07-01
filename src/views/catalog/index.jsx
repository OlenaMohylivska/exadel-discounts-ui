import React, { useState, useEffect, useMemo, useContext } from "react"
import ProductCard from "components/product-card"
import { Form, Container } from "react-bootstrap"
import FetchError from "components/fetch-error"
import Loupe from "components/icons/Loupe"
import Select from "react-select"
import * as axios from "axios"
import "./styles.scss"
import { Context } from "store/context"

const Catalog = () => {

  const cardImages = useContext(Context)

  const [discounts, setDiscounts] = useState([])
  const [searchLocation, setSearchLocation] = useState([])
  const [filterTags, setFilterTags] = useState([])
  const fetchData = async () => {
    axios
      .get(process.env.REACT_APP_BASE_BACKEND_URL + "/api/discounts/all")
      .then((response) =>
        setDiscounts(() =>
          response.data.map((el, index) => ({
            ...el,
            img: cardImages[index],
          }))
        )
      )
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
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/tags/"
    axios.get(apiUrl).then((res) => {
      setFilterTags(res.data)
    })
  }, [])

  const topRatedHandler = () => {
    const topRated = discounts.filter((el) => el.rate >= 4)
    setDiscounts(topRated)
  }

  const sortingByRate = ["Top rated"]


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

  return (
    <Container className="catalog-wrapper">
      <h1 className="catalog-title">Catalog of discounts</h1>
      <div className="row filter-panel">
        <label className="col-lg-5 col-md-12 search-container">
          <div className="search-icon">
            <Loupe />
          </div>
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
            placeholder="Location"
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
            placeholder="Sorting by..."
            onSelect={topRatedHandler}
          />
        </div>
      </div>
      <div className="discounts-wrapper">
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
