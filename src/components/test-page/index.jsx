import React, { useEffect, useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import Error from "../error"
import "./styles.css"
import * as axios from "axios"

const BaseURL = "https://sandbox-team5.herokuapp.com/api/"
const TestPage = () => {
  const [data, setData] = useState({
    id: 15,
    modified: null,
    modifiedBy: null,
    periodStart: 1274313600000,
    tags: [{ id: 1, name: "sport" }],
    quantity: 0,
    company: null,
  })
  const [errors, setErrors] = useState({})
  const [companies, setCompanies] = useState([])
  const [locations, setLocations] = useState([])

  const fetchData = async (url, setFunc) => {
    axios.get(BaseURL + url).then((response) => setFunc(response.data))
  }

  const handleChange = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    fetchData("company/all", setCompanies)
  }, [])

  useEffect(() => {
    fetchData("location/all", setLocations)
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
        axios.post(BaseURL + "discounts", data)
      } catch (e) {
        console.log(e.message)
      }
    }
  }
  console.log(companies)
  console.log(locations)
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
    <>
      <Form>
        <div className='discount-container'>
          <div className='discount-col'>
            <div className='load-img'>
              <div className='img'>img</div>
              <label className='file' htmlFor='file'>
                choose file
              </label>
              <input type='file' name='' id='file' />
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
                onClick={() => submit()}>
                save
              </Button>{" "}
              <Button variant='danger' onClick={() => reset()} className='btn'>
                reset
              </Button>
            </div>
          </div>
          <div className='discount-col input-fields  '>
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
    </>
  )
}

export default TestPage
