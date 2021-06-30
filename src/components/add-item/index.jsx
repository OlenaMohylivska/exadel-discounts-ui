import React, { useState, useEffect } from "react"
import { Button, Form, FormControl, InputGroup, Toast } from "react-bootstrap"
import ValidationError from "../validation-error"
import "./styles.scss"
import * as axios from "axios"
import Select from "react-select"
import FileUploadPage from "components/upload-file"
import PropTypes from "prop-types"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const AddItem = (props) => {
  const [data, setData] = useState({
    periodEnd: null,
    tags: [],
    quantity: null,
    company: null,
    periodStart: null,
  })
  const [errors, setErrors] = useState({})
  const [discountPostError, setDiscountPostError] = useState({
    error: null,
    show: false,
  })
  const [discountProviders, setDiscountProviders] = useState([])
  const [discountProvidersLocations, setDiscountProvidersLocations] = useState(
    []
  )
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState({})
  const companyOptions = discountProviders.map((company) => {
    return {
      value: company.name,
      label: company.name,
      id: company.id,
    }
  })

  const countryOptions = discountProvidersLocations.map((location) => {
    return {
      value: location.country.name,
      label: location.country.name,
      id: location.country.id,
    }
  })
  let cityOptions = discountProvidersLocations.map((location) => {
    return {
      value: location.city,
      label: location.city,
      id: location.id,
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

  const fetchData = async (url, setFunc) => {
    axios.get(baseUrl + url).then((response) => setFunc(response.data))
  }

  const handleChange = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleChangeCategory = (e) => {
    setCategory(e)
  }
  const handleChangeTags = (e) => {
    setData({
      ...data,
      tags: e.map((elem) => ({ name: elem.value, id: elem.id })),
    })
  }
  const handleChangeCompanies = (e) => {
    return setData({
      ...data,
      company: { id: e.id },
    })
  }

  useEffect(() => {
    fetchData("/api/company/all", setDiscountProviders)
  }, [])
  useEffect(() => {
    fetchData("/api/tags", setTags)
  }, [])

  useEffect(() => {
    fetchData("/api/location/all", setDiscountProvidersLocations)
  }, [])

  useEffect(() => {
    if (props.isEditable) fetchData(`/api/discounts/${props.id}`, setData)
  }, [])
  const checkQuantity = () => {
    if (data.quantity && data.quantity < 1) setData({ ...data, quantity: 1 })
  }
  checkQuantity()

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
    if (data.tags.length === 0) errorObj.tags = "Select tags"
    return errorObj
  }

  const submit = async () => {
    const errorsObj = validate()
    if (Object.keys(errorsObj).length > 0) {
      return setErrors(errorsObj)
    }
    if (Object.keys(errorsObj).length == 0) {
      try {
        axios.post(baseUrl + "/api/discounts", data)
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
        axios.put(baseUrl + `/api/discounts/${props.id}`, data)
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
      tags: null,
      quantity: null,
      company: null,
    })
  }

  return (
    <Form>
      <div className='discount-container'>
        <Toast
          show={discountPostError.show}
          autohide
          onClose={() => {
            setDiscountPostError({ show: false, error: null })
          }}>
          <Toast.Body>{discountPostError.error}</Toast.Body>
        </Toast>
        <div className='discount-col '>
          <div className='load-img'>
            <FileUploadPage />
          </div>
          <div className='description'>
            <h3>Description:</h3>
            <InputGroup>
              <FormControl
                as='textarea'
                className='description-text'
                name='description'
                value={data.description ? data.description : ""}
                onChange={(e) => handleChange(e)}
                id=''
              />
            </InputGroup>
            {errors.description ? (
              <ValidationError error={errors.description} />
            ) : (
              ""
            )}
          </div>

          <div className='btn-field'>
            <Button
              variant='primary'
              className='btn'
              onClick={props.isEditable ? () => edit() : () => submit()}>
              Save
            </Button>
            <Button variant='danger' onClick={() => reset()} className='btn'>
              Reset
            </Button>
          </div>
        </div>
        <div className='col input-fields '>
          <div className='discount-provider-name'>
            <h4 className='discount-subtitle'>Select Company Name:</h4>
            <Select
              options={companyOptions}
              onChange={(e) => {
                handleChangeCompanies(e)
              }}
            />
          </div>
          {errors.company ? <ValidationError error={errors.company} /> : ""}
          <div className='discount-provider-location'>
            <h4 className='discount-subtitle'>Select Country:</h4>
            <Select required options={countryOptions} onChange={() => {}} />
            <h4 className='discount-subtitle'>Select City:</h4>
            <Select options={cityOptions} onChange={() => {}} isMulti />
            <h4>Enter address:</h4>
            <InputGroup>
              <FormControl
                placeholder='Enter address:'
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
          </div>
          <h4 className='discount-subtitle'>Category:</h4>
          <Select
            value={category}
            options={categoryOptions}
            name='category'
            onChange={(e) => handleChangeCategory(e)}
          />
          {errors.tags ? <ValidationError error={errors.tags} /> : ""}
          <h4 className='discount-subtitle'>Discount Tags:</h4>
          <Select
            isMulti
            options={tagsOptions}
            onChange={(e) => handleChangeTags(e)}
          />
          {errors.tags ? <ValidationError error={errors.tags} /> : ""}
          <h4>Name of discount:</h4>
          <InputGroup>
            <FormControl
              size='sm'
              placeholder='Fill the name of discount,first letter must be uppercase'
              name='name'
              value={data.name ? data.name : ""}
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
          {errors.name ? <ValidationError error={errors.name} /> : ""}

          <h4>Terms:</h4>
          <h5 className='date-headers'>From:</h5>
          <InputGroup>
            <FormControl
              type='date'
              name='periodStart'
              value={data.periodStart ? data.periodStart : ""}
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
          {errors.periodStart ? (
            <ValidationError error={errors.periodStart} />
          ) : (
            ""
          )}
          <h5 className='date-headers'>To:</h5>
          <InputGroup>
            <FormControl
              type='date'
              name='periodEnd'
              value={data.periodEnd ? data.periodEnd : ""}
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
          {errors.periodEnd ? <ValidationError error={errors.periodEnd} /> : ""}
          <h4>Promo:</h4>
          <InputGroup>
            <FormControl
              placeholder='Fill the name of promo'
              name='promoCode'
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
