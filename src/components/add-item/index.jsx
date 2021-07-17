import React, { useState, useEffect } from "react"
import { Button, Form, FormControl, InputGroup, Toast } from "react-bootstrap"
import ValidationError from "../validation-error"
import "./styles.scss"
import axiosInstance from "components/api"
import Select from "react-select"
import FileUploadPage from "components/upload-file"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import AddLocation from "../add-location"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const AddItem = (props) => {
  ///// start states
  const history = useHistory()
  const [data, setData] = useState({
    periodEnd: null,
    country: null,
    category: { name: "", tags: [] },
    quantity: null,
    company: null,
    periodStart: null,
    nameImage: null,
    tags: [],
  })
  const [errors, setErrors] = useState({})
  const [discountPostError, setDiscountPostError] = useState({
    error: null,
    show: false,
  })
  const [discountProviders, setDiscountProviders] = useState([])
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState({})
  const [chooseLocation, setChooseLocation] = useState([])
  const [actualLocation, setActualLocation] = useState({
    country: "",
    cities: [],
  })
  const [citiesLocation, setCitiesLocation] = useState([])
  const [countryLocation, setCountryLocation] = useState(null)
  const [newLocationsArr, setNewLocationsArr] = useState([{ id: 0 }])
  const [nameImage, setNameImage] = useState({ nameImage: null })
  /////// end states

  ////consoles put here if it needs

  ////// end consoles

  ////// selector options
  const companyOptions = discountProviders.map((company) => {
    return {
      value: company.name,
      label: company.name,
      id: company.id,
    }
  })

  const tagsOptions = tags.map((tag) => {
    return {
      value: tag.name,
      label: tag.name,
      id: tag.id,
    }
  })
  const categoryOptions = [
    { value: "Food", label: "Food" },
    { value: "Sport", label: "Sport" },
    { value: "Education", label: "Education" },
  ]
  const locationOptions = chooseLocation.map((country) => {
    return {
      value: country.name,
      label: country.name,
      cities: country.cities,
    }
  })
  ////////// end selector category options

  ////// handleChanges
  const handleChange = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleChangeCategory = (e) => {
    setCategory({ name: e.value })
  }
  const handleChangeCompanies = (e) => {
    setData({
      ...data,
      company: { id: e.id },
    })
    fetchDataLocation(`/api/company/${e.id}`, setChooseLocation)
  }
  const locationHandleChange = (e) => {
    setActualLocation({ name: e.value })
    setCountryLocation(e.cities)
  }
  ///// end handleChanges
  //// fetch functions
  const fetchData = async (url, setFunc) => {
    axiosInstance.get(baseUrl + url).then((response) => setFunc(response.data))
  }
  const fetchDataLocation = async (url, setFunc) => {
    axiosInstance
      .get(baseUrl + url)
      .then((response) => setFunc(response.data.countries))
  }
  //// end fetch functions

  //// useEffects FOR CHANGE DATA

  useEffect(() => {
    setData({ ...data, category: category, tags: category.tags })
  }, [category])
  const handleChangeTags = (e) => {
    const arr = e.map((elem) => ({
      name: elem.value,
      id: elem.id,
    }))
    setCategory({ ...category, tags: arr })
  }

  useEffect(() => {
    setActualLocation({ ...actualLocation, cities: citiesLocation })
  }, [citiesLocation])
  useEffect(() => {
    setData({ ...data, country: actualLocation })
  }, [actualLocation])
  useEffect(() => {
    setData({ ...data, nameImage: nameImage })
  }, [nameImage])
  ////

  ///// useEffects FOR FETCH DATA

  useEffect(() => {
    fetchData("/api/company", setDiscountProviders)
  }, [])
  useEffect(() => {
    fetchData("/api/tags", setTags)
  }, [])
  useEffect(() => {
    if (props.isEditable) fetchData(`/api/discounts/${props.id}`, setData)
  }, [])
  //////

  const checkQuantity = () => {
    if (data.quantity && data.quantity < 1) setData({ ...data, quantity: 1 })
  }

  checkQuantity()

  ///// helping functions SUBMIT, VALIDATE etc...

  const validate = () => {
    let errorObj = {}
    if (!data.description) errorObj.description = "description cannot be blank"
    if (!data.periodEnd) errorObj.periodEnd = "Terms cannot be blank"
    if (!data.periodStart) errorObj.periodStart = "Terms cannot be blank"
    if (data.periodStart > data.periodEnd) errorObj.periodEnd = "Wrong data"
    if (!data.name) errorObj.name = "Name cannot be blank"
    if (!data.promoCode) errorObj.promoCode = "PromoCode cannot be blank"
    if (data.company && data.company.length === 0)
      errorObj.company = "Choose company"

    return errorObj
  }

  const submit = async () => {
    const errorsObj = validate()
    if (Object.keys(errorsObj).length > 0) {
      return setErrors(errorsObj)
    }
    if (Object.keys(errorsObj).length == 0) {
      try {
        axiosInstance.post(baseUrl + "/api/discounts", data)
        reset()
      } catch (e) {
        setDiscountPostError({ error: e.message, show: true })
      }
    }
  }
  const edit = async () => {
    const errorsObj = validate()
    if (Object.keys(errorsObj).length > 0) {
      return setErrors(errorsObj)
    }
    if (Object.keys(errorsObj).length == 0) {
      try {
        axiosInstance.put(baseUrl + `/api/discounts/${props.id}`, data)
        reset()
      } catch (e) {
        throw e.message
      }
    }
  }

  const reset = () => {
    setErrors({})
    setData({
      periodStart: null,
      periodEnd: null,
      name: null,
      category: { name: "", tags: [] },
      quantity: null,
      company: null,
      nameImage: null
    })
  }

  const addNewLocation = () => {
    setNewLocationsArr([...newLocationsArr, { id: newLocationsArr.length + 1 }])
  }
  //////// END HELPING FUNCTIONS
  ///// SHORTCUT VARIABLES
  const getLocation = (
    <>
      <span className="discount-subtitle">Location </span>
      {locationOptions && locationOptions.length > 0 ? (
        <Select
          options={locationOptions}
          onChange={(e) => locationHandleChange(e)}
          placeholder="country"
        />
      ) : (
        ""
      )}
      {newLocationsArr.map((elem) => (
        <AddLocation
          key={elem.id}
          countryLocation={countryLocation}
          citiesLocation={citiesLocation}
          setCitiesLocation={setCitiesLocation}
        />
      ))}
      <Button onClick={() => addNewLocation()}>add location</Button>
    </>
  )
  ////// END SHORTCUT VARIABLES

  return (
    <Form>
      <div className="discount-container">
        <Toast
          show={discountPostError.show}
          autohide
          onClose={() => {
            setDiscountPostError({ show: false, error: null })
          }}
        >
          <Toast.Body>{discountPostError.error}</Toast.Body>
        </Toast>
        <div className="discount-col ">
          <div className="load-img">
            <FileUploadPage setNameImage={setNameImage} />
          </div>
          <div className="description">
            <span className="headers">Description:</span>
            <InputGroup>
              <FormControl
                as="textarea"
                className="description-text"
                name="description"
                value={data.description ? data.description : ""}
                onChange={(e) => handleChange(e)}
                id=""
              />
            </InputGroup>
            {errors.description ? (
              <ValidationError error={errors.description} />
            ) : (
              ""
            )}
          </div>

          <div className="btn-field">
            <Button
              variant="primary"
              className="btn"
              onClick={props.isEditable ? () => edit() : () => submit()}
            >
              Save
            </Button>
            {props.isEditable ? (
              <Button
                variant="dark"
                className="btn"
                onClick={() => {
                  history.goBack()
                }}
              >
                Go back to promotions
              </Button>
            ) : null}
            <Button variant="danger" onClick={() => reset()} className="btn">
              Reset
            </Button>
          </div>
        </div>
        <div className="col input-fields ">
          <div className="discount-provider-name">
            <span className="discount-subtitle">Select Company Name:</span>
            <Select
              options={companyOptions}
              onChange={(e) => {
                handleChangeCompanies(e)
              }}
            />
          </div>
          {errors.company ? <ValidationError error={errors.company} /> : ""}

          {getLocation}

          <span className="discount-subtitle headers">Category:</span>
          <Select
            options={categoryOptions}
            name="category"
            onChange={(e) => handleChangeCategory(e)}
          />
          {errors.tags ? <ValidationError error={errors.tags} /> : ""}
          <span className="discount-subtitle headers">Discount Tags:</span>

          <Select
            isMulti
            options={tagsOptions}
            onChange={(e) => handleChangeTags(e)}
          />
          {errors.tags ? <ValidationError error={errors.tags} /> : ""}
          <span className="discount-subtitle headers">Name of discount:</span>
          <InputGroup>
            <FormControl
              size="sm"
              placeholder="Fill the name of discount,first letter must be uppercase"
              name="name"
              value={data.name ? data.name : ""}
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
          {errors.name ? <ValidationError error={errors.name} /> : ""}

          <span className="discount-subtitle headers">Terms:</span>
          <span className="date-headers">From:</span>
          <InputGroup>
            <FormControl
              type="date"
              name="periodStart"
              value={data.periodStart ? data.periodStart : ""}
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
          {errors.periodStart ? (
            <ValidationError error={errors.periodStart} />
          ) : (
            ""
          )}
          <span className="date-headers">To:</span>
          <InputGroup>
            <FormControl
              type="date"
              name="periodEnd"
              value={data.periodEnd ? data.periodEnd : ""}
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>

          {errors.periodEnd ? <ValidationError error={errors.periodEnd} /> : ""}
          <span className="discount-subtitle headers">Promo:</span>

          <InputGroup>
            <FormControl
              placeholder="Fill the name of promo"
              name="promoCode"
              onChange={(e) => handleChange(e)}
              value={data.promoCode ? data.promoCode : ""}
            />
          </InputGroup>

          {errors.promoCode ? <ValidationError error={errors.promoCode} /> : ""}
        </div>
      </div>
    </Form>
  )
}
AddItem.propTypes = { isEditable: PropTypes.bool, id: PropTypes.number }

export default AddItem
