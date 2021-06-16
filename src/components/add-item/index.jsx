import React, { useState, useEffect } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import Error from "../error"
import "./styles.scss"
import * as axios from "axios"
import Select from "react-select"

const AddItem = () => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [description, setDescription] = useState("")
  const [discountTypes, setDiscountTypes] = useState("")
  const [discountProviderName, setDiscountProviderName] = useState([])
  const [discountProviderLocation, setDiscountProviderLocation] = useState([])
  const [terms, setTerms] = useState("")
  const [proposeType, setProposeType] = useState("")
  const [limitations, setLimitations] = useState("")
  const [promo, setPromo] = useState("")

  const fetchNameData = async () => {
    await axios
      .get("https://sandbox-team5.herokuapp.com//api/company/all")
      .then((response) => {
        const companies = response.data
        setDiscountProviderName(companies)
      })
  }

  const fetchCityData = async () => {
    await axios
      .get("http://sandbox-team5.herokuapp.com/api/location/all")
      .then((response) => {
        const companies = response.data
        setDiscountProviderLocation(companies)
      })
  }

  useEffect(() => {
    fetchNameData()
    fetchCityData()
  }, [])

  const descriptionHandleChange = (e) => {
    setDescription(e.target.value)
  }

  const discountProviderNameHandler = (e) => {
    setDiscountProviderName(e.target.value)
  }

  const discountProviderLocationHandler = (e) => {
    setDiscountProviderLocation(e.target.value)
  }

  const discountTypesHandleChange = (e) => {
    setDiscountTypes(e.target.value)
  }
  const termsHandleChange = (e) => {
    setTerms(e.target.value)
  }

  const proposeTypeHandleChange = (e) => {
    setProposeType(e.target.value)
  }
  const limitationsHandleChange = (e) => {
    setLimitations(e.target.value)
  }
  const promoHandleChange = (e) => {
    setPromo(e.target.value)
  }

  const nameOptions = discountProviderName.map((company) => {
    return {
      value: company.name,
      label: company.name,
    }
  })

  const cityOptions = discountProviderLocation.map((company) => {
    return {
      value: company.city,
      label: company.city,
    }
  })

  const validate = () => {
    const error = {}
    if (!description.description)
      error.description = "Description cannot be blank"
    if (!discountTypes.discountTypes)
      error.discountTypes = "Discount Types cannot be blank"
    if (!terms.terms) error.terms = "Terms cannot be blank"
    if (!proposeType.proposeType) error.location = "Please choose propose type"
    if (proposeType.proposeType === "product" && !limitations.limitations)
      error.limitations = "Limitations cannot be blank"
    if (!promo.promo) error.promo = "Promo cannot be blank"
    return error
  }

  const submit = () => {
    const errorObj = validate()
    console.log()
    if (Object.keys(errorObj).length >= 0) {
      setErrors(errorObj)
    }
    setData(
      Object.assign(
        data,
        description,
        discountTypes,
        terms,
        proposeType,
        limitations,
        promo
      )
    )
  }
  const reset = () => {
    setErrors({})
    setDescription({})
    setDiscountTypes({})
    setTerms({})
    setProposeType({})
    setLimitations({})
    setPromo({})
  }

  return (
    <Form>
      <div className="container">
        <div className="col">
          <div className="load-img">
            <img
              className="discount-img"
              src="https://thumbs.dreamstime.com/t/pizza-35669930.jpg"
            />
            <input
              type="file"
              name="file-name"
              className="form-control-file"
              id="file"
            />
          </div>
          <div className="discount-provider-name">
            <h4 className="discount-subtitle">Select Company Name</h4>
            <Select
              onSelect={discountProviderNameHandler}
              options={nameOptions}
            />
          </div>
          <div className="discount-provider-location">
            <h4 className="discount-subtitle">Select Discount Location</h4>
            <Select
              isMulti
              onSelect={discountProviderLocationHandler}
              options={cityOptions}
            />
          </div>
          <div className="description">
            <h3 className="discount-subtitle">Description:</h3>
            <InputGroup>
              <FormControl
                as="textarea"
                className="description-text"
                name="description"
                onChange={descriptionHandleChange}
              />
            </InputGroup>
            {errors.description ? <Error error={errors.description} /> : ""}
          </div>
          <div className="btn-field">
            <Button variant="primary" className="btn" onClick={() => submit()}>
              save
            </Button>
            <Button variant="danger" onClick={() => reset()} className="btn">
              reset
            </Button>
          </div>
        </div>
        <div className="col input-fields ">
          <h4 className="discount-subtitle">Discount Types:</h4>
          <InputGroup>
            <FormControl
              placeholder="Filter tags(use” ; ” for splitting)"
              name="discountTypes"
              onChange={discountTypesHandleChange}
              className="form-field"
            />
          </InputGroup>
          {errors.discountTypes ? <Error error={errors.discountTypes} /> : ""}
          <h4 className="discount-subtitle">Terms:</h4>
          <InputGroup>
            <FormControl
              type="date"
              name="terms"
              onChange={termsHandleChange}
              className="form-field"
            />
          </InputGroup>
          {errors.terms ? <Error error={errors.terms} /> : ""}
          <div className="radio-box">
            <div className="discount-radio-buttons">
              <h4 className="discount-subtitle">Type:</h4>
              <div className="discount-radiobtn">
                <input
                  type="radio"
                  onChange={proposeTypeHandleChange}
                  name="proposeType"
                  id="product"
                  value="product"
                  aria-label="Radio button for following text input"
                />
                <label htmlFor="product">product</label>
              </div>
              <div className="discount-radiobtn">
                <input
                  type="radio"
                  onChange={proposeTypeHandleChange}
                  name="proposeType"
                  id="service"
                  value="service"
                />
                <label htmlFor="service">service</label>
              </div>
            </div>
          </div>
          {errors.proposeType ? <Error error={errors.proposeType} /> : ""}
          {proposeType.proposeType && proposeType.proposeType == "product" ? (
            <>
              <h4 className="discount-subtitle">Limitations:</h4>
              <InputGroup>
                <FormControl
                  placeholder="Disable button limitations"
                  name="limitations"
                  onChange={limitationsHandleChange}
                  className="form-field"
                />
              </InputGroup>
              {errors.limitations ? <Error error={errors.limitations} /> : ""}
            </>
          ) : (
            ""
          )}

          <h4 className="discount-subtitle">Promo:</h4>
          <InputGroup>
            <FormControl
              placeholder="Fill the name of promo"
              name="promo"
              onChange={promoHandleChange}
              className="form-field"
            />
          </InputGroup>
          {errors.promo ? <Error error={errors.promo} /> : ""}
        </div>
      </div>
    </Form>
  )
}

export default AddItem
