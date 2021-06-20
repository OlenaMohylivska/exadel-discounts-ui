/*eslint-disable*/
/*need to redo this, using page where post request is realized now */
import React, { useState, useEffect } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import Error from "../error"
import "./styles.scss"
import * as axios from "axios"
import Select from "react-select"
import FileUploadPage from "components/upload-file"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const AddItem = () => {
  const [data, setData] = useState({
    periodEnd: 1274313600000,
    tags: [{ id: 1, name: "sport" }],
    quantity: 0,
    companies: null,
  })
  const [errors, setErrors] = useState({})

  const [discountProviders, setDiscountProviders] = useState([])
  const [discountProvidersLocations, setDiscountProvidersLocations] = useState(
    []
  )
  console.log(discountProviders)
  console.log(discountProvidersLocations)

  // const cityOptions = locations.map((company) => {
  //   return {
  //     value: company.city,
  //     label: company.city,
  //   }
  // })

  const fetchData = async (url, setFunc) => {
    axios.get(baseUrl + url).then((response) => setFunc(response.data))
  }

  const handleChange = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value })
  }

  const fetchDiscount = async () => {
    await axios
      .get(baseUrl + `/api/discounts/19`)
      .then((response) => {
        const discount = response.data

        //setDiscountName(discount.name)
        setDescription(discount.description)
       // setDiscountQuantity(discount.quantity)
        // setDiscountTypes(discount.tags)
        setPromo(discount.promoCode)
      })
  }
  if(props.isEditable){
    fetchDiscount()
  }


  useEffect(() => {
    fetchData("/api/company/all", setDiscountProviders)
  }, [])

  useEffect(() => {
    fetchData("/api/location/all", setDiscountProvidersLocations)
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
        axios.post("http://sandbox-team5.herokuapp.com/api/discounts", data)
        reset()
      } catch (e) {
        throw e.message
      }
    }
  }
  console.log(data)

  const reset = () => {
    setErrors({})
    setData({
      id: 15,
      modified: null,
      modifiedBy: null,
      periodStart: 1274313600000,
      tags: [{ id: 1, name: "sport" }],
      quantity: 0,
      company: null,
    })
  }
  console.log(data)

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
            <Button variant='primary' className='btn' onClick={() => submit()}>
              save
            </Button>{" "}
            <Button variant='danger' onClick={() => reset()} className='btn'>
              reset
            </Button>
          </div>
        </div>
        <div className='col input-fields '>
          <div className='discount-provider-name'>
            <h4 className='discount-subtitle'>Select Company Name</h4>
            <Select />
          </div>
          <div className='discount-provider-location'>
            <h4 className='discount-subtitle'>Select Discount Location</h4>
            <Select isMulti />
          </div>
          <h4 className='discount-subtitle'>Discount Types:</h4>
          <InputGroup>
            <FormControl
              placeholder='Filter tags(use” ; ” for splitting)'
              name='discountTypes'
              className='form-field'
            />
          </InputGroup>
          {errors.discountTypes ? <Error error={errors.discountTypes} /> : ""}

          <div className='radio-box'>
            <h4 className='discount-subtitle'>Type:</h4>
            <div className='discount-radiobtn'>
              <input
                type='radio'
                name='proposeType'
                id='product'
                value='product'
                aria-label='Radio button for following text input'
              />
              <label htmlFor='product'>product</label>
            </div>
            <div className='discount-radiobtn'>
              <input
                type='radio'
                name='proposeType'
                id='service'
                value='service'
              />
              <label htmlFor='service'>service</label>
            </div>
          </div>
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
AddItem.propTypes = { isEditable: PropTypes.bool, discount: PropTypes.object}

export default AddItem
