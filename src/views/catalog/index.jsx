import React, { useState, useEffect, useMemo } from "react"
import ProductCard from "components/product-card"
import { Form, Container } from "react-bootstrap"
import Loupe from "components/icons/Loupe"
import Select from "react-select"
import * as axios from "axios"
import "./styles.scss"

const productImages = [
  "https://image.freepik.com/free-photo/flat-lay-salad-with-chicken-sesame-seeds_23-2148700369.jpg",
  "https://image.freepik.com/free-photo/female-model-having-massage-spa_144627-45562.jpg",
  "https://as1.ftcdn.net/jpg/03/23/88/04/500_F_323880492_hzHomcVGvKYng7yDKt06EfPt06fZDhnl.jpg",
  "https://image.freepik.com/free-photo/homemade-muesli-bowl-oat-granola-with-yogurt-fresh-blueberries-mulberry-strawberries-kiwi-mint-nuts-board-healthy-breakfast-copy-space-healthy-breakfast-concept-clean-eating_1150-45829.jpg",
  "https://image.freepik.com/free-photo/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand_335224-1094.jpg",
  "https://image.freepik.com/free-photo/serious-unshaven-male-backpacker-keeps-binoculars-near-eyes-wears-hat-red-jacket-explores-new-way-carries-tourist-backpack_273609-33394.jpg",
  "https://image.freepik.com/free-photo/pair-trainers_144627-3799.jpg",
  "https://image.freepik.com/free-photo/woman-showing-her-beautiful-nails_23-2148697087.jpg",
  "https://image.freepik.com/free-photo/portrait-doctor_144627-39406.jpg",
  "https://image.freepik.com/free-photo/veterinarian-check-ing-puppy-s-health_23-2148728391.jpg",
  "https://image.freepik.com/free-photo/attractive-stylish-smiling-woman-choosing-apparel-clothing-store_285396-4642.jpg",
  "https://image.freepik.com/free-psd/coffee-cup-mockup_23-2148037991.jpg",
  "https://image.freepik.com/free-photo/close-up-young-smiling-curly-redhead-bearded-young-man-white-tshirt-showing-airpods_171337-7833.jpg",
  "https://image.freepik.com/free-photo/heap-beet-micro-greens-table_1157-35989.jpg",
  "https://image.freepik.com/free-photo/club-sandwich-panini-with-ham-cheese-tomato-herbs_2829-19928.jpg",
  "https://t3.ftcdn.net/jpg/02/56/67/18/240_F_256671837_fpHohurGNgwNW1jqj0hIZ8Lp54OWLkNr.jpg",
  "https://image.freepik.com/free-photo/african-american-woman-experiencing-vr-simulation_53876-98564.jpg",
  "https://as1.ftcdn.net/jpg/02/96/54/62/500_F_296546295_j8CKPzLmQ3xHmD2X7wmivK1m5WnIxo6W.jpg",
  "https://image.freepik.com/free-photo/pancake-week-shrovetide-rolled-pancakes-stuffed-chicken-meat-vegetables-savory-crepes_2829-20292.jpg",
]

const Catalog = () => {
  const [discounts, setDiscounts] = useState(null)
  const [searchLocation, setSearchLocation] = useState([])
  const [filterTags, setFilterTags] = useState([])
  const [discountsFetchError, setDiscountsFetchError] = useState(null)
  const fetchData = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_BASE_BACKEND_URL + "/api/discounts/all")
        .then((response) =>
          setDiscounts(() =>
            response.data.map((el, index) => ({
              ...el,
              img: productImages[index],
            }))
          )
        )
    } catch (e) {
      setDiscountsFetchError(e.message)
    }
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
    <Container className='catalog-wrapper'>
      <h1 className='catalog-title'>Catalog of discounts</h1>
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
      {discounts ? (
        <div className='discounts-wrapper'>
          {discounts.map((el) => {
            return <ProductCard elem={el} key={el.id} />
          })}
        </div>
      ) : (
        <div className='fetch-error-info'>
          Sorry no info, {discountsFetchError ? discountsFetchError : ""}
        </div>
      )}
    </Container>
  )
}

export default Catalog
