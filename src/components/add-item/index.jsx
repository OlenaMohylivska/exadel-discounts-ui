import React, { useState, useEffect } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import Error from "../error"
import "./styles.scss"
import * as axios from "axios"
import Select from "react-select"
import FileUploadPage from "components/upload-file"
import PropTypes from "prop-types"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const AddItem = (props) => {
  const [data, setData] = useState({
    periodEnd: 1274313600000,
    tags: [],
    quantity: 0,
    companies: null,
  })
  const [errors, setErrors] = useState({})

  const [discountProviders, setDiscountProviders] = useState([])
  const [discountProvidersLocations, setDiscountProvidersLocations] = useState(
    []
  )
  const [tags, setTags] = useState([])

  console.log(discountProviders)
  console.log(discountProvidersLocations)

  const companyOptions = discountProviders.map((company) => {
    return {
      value: company.name,
      label: company.name,
      id: company.id,
    }
  })

  const cityOptions = discountProvidersLocations.map((company) => {
    return {
      value: company.city,
      label: company.city,
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

  const fetchData = async (url, setFunc) => {
    axios.get(baseUrl + url).then((response) => setFunc(response.data))
  }

  const handleChange = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleChangeTags = (e) => {
    setData({
      ...data,
      tags: e.map((elem) => ({ name: elem.value, id: elem.id })),
    })
  }
  console.log(data)

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

  const validate = () => {
    let errorObj = {}
    if (!data.description) errorObj.description = "description cannot be blank"
    if (!data.periodEnd) errorObj.periodEnd = "Terms cannot be blank"
    if (!data.name) errorObj.name = "Name cannot be blank"
    if (!data.promoCode) errorObj.promoCode = "PromoCode cannot be blank"
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
        throw e.message
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
      modified: null,
      modifiedBy: null,
      periodStart: 1274313600000,
      tags: [],
      quantity: 0,
      company: null,
    })
  }

  return (
    <Form>
      <div className='discount-container'>
        <div className='discount-col'>
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
            {errors.description ? <Error error={errors.description} /> : ""}
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
            <h4 className='discount-subtitle'>Select Company Name</h4>
            <Select
              options={companyOptions}
              name='company'
              onChange={(e) => {
                console.log(e)
              }}
            />
          </div>
          <div className='discount-provider-location'>
            <h4 className='discount-subtitle'>Select Discount Location</h4>
            <Select
              options={cityOptions}
              onChange={(e) => {
                console.log(e)
              }}
              isMulti
            />
          </div>
          <h4 className='discount-subtitle'>Discount Types:</h4>
          <Select
            isMulti
            options={tagsOptions}
            onChange={(e) => handleChangeTags(e)}
          />
          {errors.discountTypes ? <Error error={errors.discountTypes} /> : ""}
          <h4>Name of discount</h4>
          <InputGroup>
            <FormControl
              className='form-field'
              size='sm'
              placeholder='Fill the name of discount,first letter must be uppercase'
              name='name'
              value={data.name ? data.name : ""}
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
          {errors.name ? <Error error={errors.name} /> : ""}

          <h4>Terms:</h4>
          <InputGroup>
            <FormControl
              type='date'
              name='periodEnd'
              value={data.periodEnd ? data.periodEnd : ""}
              onChange={(e) => handleChange(e)}
              className='form-field'
            />
          </InputGroup>
          {errors.periodEnd ? <Error error={errors.periodEnd} /> : ""}

          <h4>Promo:</h4>
          <InputGroup>
            <FormControl
              placeholder='Fill the name of promo'
              name='promoCode'
              onChange={(e) => handleChange(e)}
              className='form-field'
              value={data.promoCode ? data.promoCode : ""}
            />
          </InputGroup>
          {errors.promoCode ? <Error error={errors.promoCode} /> : ""}
        </div>
      </div>
    </Form>
  )
}
AddItem.propTypes = { isEditable: PropTypes.bool, id: PropTypes.number }

export default AddItem
