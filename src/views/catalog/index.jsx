import React, { useState, useEffect, useMemo, useContext } from "react"
import ProductCard from "components/product-card"
import { Form, Container, Spinner } from "react-bootstrap"
import Loupe from "components/icons/Loupe"
import Select from "react-select"
import "./styles.scss"
import { Context } from "store/context"
import FetchError from "components/fetch-error"
import Pagination from "components/pagination"
import axiosInstance from "../../components/api"

const Catalog = () => {
  const images = useContext(Context)
  const [discounts, setDiscounts] = useState(null)
  const [discountsFetchError, setDiscountsFetchError] = useState(null)
  const [searchLocation, setSearchLocation] = useState([])
  const [citiesLocation, setCitiesLocation] = useState([])
  const [filterTags, setFilterTags] = useState([])
  const [searchCompanies, setSearchCompanies] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState({
    // companies: [""],
    itemsPerPage: 100,
    // orders: [
    //   {
    //     direction: "ASC",
    //     sortBy: "",
    //   },
    // ],
    // pageNum: 0,
    // rate: 0,
    // searchText: "",
    // tags: [],
  })
  console.log(search)

  const [searching, setSearching] = useState(false)
  console.log(searchLocation)
  const cityOptions = citiesLocation.map((city) => {
    return {
      value: city.name,
      label: city.name,
    }
  })

  const handleSearchCompanies = (e) => {
    setSearch({ ...search, companies: [e.label] })
    setTimeout(funcHelperForSearching, 2000)
  }
  const handleSearchTags = (e) => {
    const arr = e.map((e) => e.value)
    setSearch({ ...search, tags: arr })
    setTimeout(funcHelperForSearching, 2000)
  }
  console.log(discounts)
  const handleSortingOption = (e) => {
    const orders = {
      orders: [
        {
          sortBy: e.value,
        },
      ],
    }
    setSearch({ ...search, orders: orders.orders })
    setTimeout(funcHelperForSearching, 2000)
  }
  const handleSearchText = (e) => {
    setSearch({ ...search, searchText: e.target.value })
    setTimeout(funcHelperForSearching, 2000)
  }
  const handleSearchLocation = (e) => {
    setSearch({
      ...search,
      locationCriteria: { country: e.value, cities: null },
    })
    setCitiesLocation(e.country)
    setSearching(true)
    setLoading(true)
  }
  const handleSearchCity = (e) => {
    setSearch({ ...search, locationCriteria: { cities: e.value } })
    setSearching(true)
    setLoading(true)
  }
  const funcHelperForSearching = () => {
    setSearching(true)
    setLoading(true)
  }

  useEffect(() => {
    if (searching) {
      axiosInstance
        .post("/api/discounts/search", search)
        .then((res) => setDiscounts(res.data.content))
      setLoading(false)
      setSearching(false)
    } else {
      return
    }
  }, [searching])
  const fetchData = async () => {
    setLoading(true)
    try {
      await axiosInstance
        .get(process.env.REACT_APP_BASE_BACKEND_URL + "/api/discounts")
        .then((response) =>
          setDiscounts(() =>
            response.data.map((el, index) => ({
              ...el,

              img: images.productImages[index],
            }))
          )
        )
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setDiscountsFetchError(e.message)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/location"
    axiosInstance
      .get(apiUrl)
      .then((resp) => {
        setSearchLocation(resp.data)
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/tags"
    axiosInstance
      .get(apiUrl)
      .then((res) => {
        setFilterTags(res.data)
      })
      .catch((err) => setFetchError(err.message))
  }, [])
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_BACKEND_URL + "/api/company"
    axiosInstance
      .get(apiUrl)
      .then((res) => {
        setSearchCompanies(res.data)
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  // const topRatedHandler = () => {
  //   const topRated = discounts.filter((el) => el.rate >= 4)
  //   setDiscounts(topRated)
  // }

  const sortingByRate = [{ label: "Sort by rate", value: "rate" }]
  const companiesOptions = useMemo(() => {
    return searchCompanies.map((company) => ({
      label: company.name,
      value: company.name,
    }))
  })

  const countryOptions =
    searchLocation &&
    searchLocation.map((location) => ({
      label: location.name,
      value: location.name,
      country: location.cities,
    }))

  const categoriesOptions = filterTags.map((el) => {
    return {
      value: el.name,
      label: el.name,
    }
  })

  const sortingOptions = sortingByRate.map((el) => {
    return {
      value: el.value,
      label: el.label,
    }
  })

  return (
    <>
      {fetchError ? (
        <FetchError error={fetchError} />
      ) : (
        <Container className="catalog-wrapper">
          <div className=" filter-panel column ">
            <div className="width-100">
              <label className="col-lg-5 col-md-12 search-container padding-right-12px ">
                <div className="search-icon">
                  <Loupe />
                </div>
                <Form className="search-input">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      onChange={(e) => handleSearchText(e)}
                      placeholder="Enter your search"
                    />
                  </Form.Group>
                </Form>
              </label>
            </div>

            <div className=" catalog-filters width-100">
              <div className="location-column">
                <Select
                  className="catalog-selects-width-100"
                  options={countryOptions}
                  placeholder="Location"
                  onChange={(e) => handleSearchLocation(e)}
                />
                {cityOptions.length > 0 && (
                  <Select
                    className="catalog-selects-width-100"
                    options={cityOptions}
                    placeholder="City"
                    onChange={(e) => handleSearchCity(e)}
                  />
                )}
              </div>
              <Select
                className="catalog-selects"
                options={companiesOptions}
                placeholder="Companies"
                onChange={(e) => handleSearchCompanies(e)}
              />
              <Select
                className="catalog-selects"
                isMulti
                options={categoriesOptions}
                placeholder="Categories"
                onChange={(e) => handleSearchTags(e)}
              />
              <Select
                className="catalog-selects"
                options={sortingOptions}
                onChange={(e) => handleSortingOption(e)}
                placeholder="Sorting by..."
              />
            </div>
          </div>

          {loading && (
            <div className="spin-container">
              <Spinner className="spin-loader" animation="border" />
            </div>
          )}
          {discounts && (
            <div className="discounts-wrapper">
              {discounts.slice(0, itemsPerPage).map((el) => {
                return <ProductCard elem={el} key={el.id} />
              })}
            </div>
          )}
          {discountsFetchError && (
            <div className="spinner">Sorry no info, {discountsFetchError}</div>
          )}
          {discounts && (
            <Pagination
              discounts={discounts}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          )}
        </Container>
      )}
    </>
  )
}

export default Catalog
