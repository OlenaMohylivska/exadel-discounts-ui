/*TODO: add dates to state, add styles, fix put-request, fix warnings in console*/
import React, { useState, useEffect } from 'react'
import './styles.scss'
import * as axios from 'axios'
import Select from 'react-select'
import { Button, Col, Container, Form } from "react-bootstrap"
import Error from 'components/error'

const EditItem = () => {

  const BASE_URL = 'https://sandbox-team5.herokuapp.com/api/'

  const [errors, setErrors] = useState({})
  const [allDiscounts, setAllDiscounts] = useState([])
  const [discountName, setDiscountName] = useState('')
  const [discountId, setDiscountId] = useState()
  const [discountDescription, setDiscountDescription] = useState('')
  const [discountQuantity, setDiscountQuantity] = useState()
  const [discountTags, setDiscountTags] = useState([])
  const [discountPromo, setDiscountPromo] = useState('')

  const fetchAllDiscounts = async () => {
    await axios
      .get(BASE_URL + 'discounts/all')
      .then((response) => {
        setAllDiscounts(response.data)
      })
  }

  const fetchDiscount = async () => {
    await axios
      .get(BASE_URL + `discounts/${discountId}`)
      .then((response) => {
        const discount = response.data

        setDiscountName(discount.name)
        setDiscountId(discount.id)
        setDiscountDescription(discount.description)
        setDiscountQuantity(discount.quantity)
        setDiscountTags(discount.tags)
        setDiscountPromo(discount.promoCode)
      })
  }
  useEffect(() => {
    fetchAllDiscounts()
  }, [])

  useEffect(() => {
    fetchDiscount()
  }, [discountId])

  const discountHandler = (e) => {
    setDiscountId(e.id)
    setDiscountName(e.value)
  }

  const discountNameHandler = (e) => {
    setDiscountName(e.target.value)
  }
  const discountDescriptionHandler = (e) => {
    setDiscountDescription(e.target.value)
  }
  const discountQuantityHandler = (e) => {
    setDiscountQuantity(e.target.value)
  }
  const discountTagsHandler = (e) => {
    setDiscountTags(e.target.value)
  }
  const discountPromoHandler = (e) => {
    setDiscountPromo(e.target.value)
  }

  const validate = () => {
    /*add some other verifications*/
    const error = {}
    if (!discountDescription)
      error.description = 'Description cannot be blank'
    if (!discountName)
      error.name = 'Name cannot be blank'
    if (!discountQuantity)
      error.quantity = 'Quantity cannot be blank'
    if (!discountPromo)
      error.promo = 'Promo cannot be blank'
    return error
  }

  const reset = () => {
    setDiscountName('')
    setDiscountDescription('')
    setDiscountQuantity()
    setDiscountTags([])
    setDiscountPromo('')
  }

  const submit = async () => {
    const errorObj = validate()

    if (Object.keys(errorObj).length >= 0) {
      setErrors(errorObj)
    }
    const discount = {
      name: discountName,
      description: discountDescription,
      quantity: discountQuantity,
      tags: discountTags,
      promoCode: discountPromo
    }
    await axios.put(BASE_URL + `discounts/${discountId}`, discount)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })

  }
  const discountNameOptions = allDiscounts.map(discount => {
    return {
      id: discount.id,
      value: discount.name,
      label: discount.name
    }
  })

  return (
    <Container>
      <Col className="mx-auto" xl={6} lg={6} md={9} xs={10}>
        <Form>
          <Form.Group className="form-item">
            <Form.Label className="discount-subtitle">Select Discount Name</Form.Label>
            <Select
              selectOption={discountName}
              onChange={discountHandler}
              options={discountNameOptions}
            />
          </Form.Group>
          {discountId &&
            <div>
              <Form.Group className="form-item">
                <Form.Label className="discount-subtitle">Name: </Form.Label>
                <Form.Control
                  onChange={discountNameHandler}
                  value={discountName}
                />
                {errors.name ? <Error error={errors.name} /> : ""}
                {/* show errors */}
              </Form.Group>
              <Form.Group className="form-item">
                <Form.Label className="discount-subtitle">Description: </Form.Label>
                <Form.Control
                  as="textarea"
                  className="description-text"
                  onChange={discountDescriptionHandler}
                  value={discountDescription}
                />
              </Form.Group>
              <Form.Group className="form-item">
                <Form.Label className="discount-subtitle">Quantity: </Form.Label>
                <Form.Control
                  type="number"
                  onChange={discountQuantityHandler}
                  value={discountQuantity}
                />
              </Form.Group>
              <Form.Group className="form-item">
                <Form.Label className="discount-subtitle">Tags: </Form.Label>
                <Form.Control
                  as="textarea"
                  className="description-text"
                  onChange={discountTagsHandler}
                  value={discountTags}
                />
              </Form.Group>

              <Form.Group className="form-item">
                <Form.Label className="discount-subtitle">Promo: </Form.Label>
                <Form.Control
                  onChange={discountPromoHandler}
                  value={discountPromo}
                />
              </Form.Group>
              <div className="d-flex justify-content-around pt-5" >
                <Button className="w-25" variant="success" onClick={() => submit()}>
                  Save
                </Button>
                <Button className="w-25" variant="danger" onClick={() => reset()} >
                  Reset
                </Button>
              </div>
            </div>}
        </Form>
      </Col>
    </Container>
  )
}

export default EditItem