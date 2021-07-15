import React, { useState, useEffect } from "react"
import { Container, Form, Button, Spinner } from "react-bootstrap"
import Loupe from "components/icons/Loupe"
import axiosInstance from "components/api"
import { Redirect } from "react-router-dom"
import "./styles.scss"
import PromotionInfo from "components/promotionInfo"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const Promotions = () => {
  const [discounts, setDiscounts] = useState([])
  const [discountsFetchError, setDiscountsFetchError] = useState(null)
  const [newDiscount, setNewDiscount] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    try {
      setLoading(true)
      await axiosInstance
        .get(`${baseUrl}/api/discounts`)
        .then((response) => setDiscounts(response.data))
      setLoading(false)
    } catch (e) {
      setDiscountsFetchError(e.message)
    }
  }, [])

  const newDiscountHandler = () => {
    setNewDiscount(!newDiscount)
  }

  return (
    <Container className="catalog-wrapper">
      <div className=" filter-panel column ">
        <div className="width-100">
          <label className="col-lg-5 col-md-12 search-container padding-right-12px ">
            <div className="search-icon">
              <Loupe />
            </div>
            <Form className="search-input">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Enter your search" />
              </Form.Group>
            </Form>
          </label>
        </div>
      </div>
      <div className="btn-wrapper d-flex justify-content-center">
        <Button
          variant="primary"
          className="h-100 px-4 align-self-center"
          onClick={newDiscountHandler}
        >
          Add new discount
        </Button>
      </div>
      {newDiscount ? <Redirect to="/admin/add-item" /> : ""}
      {loading && (
        <div className="spin-container">
          <Spinner className="spin-loader" animation="border" variant="info" />
        </div>
      )}
      {discounts ? (
        <div className="discounts-wrapper">
          {discounts.map((elem) => {
            return <PromotionInfo elem={elem} key={elem.id} />
          })}
        </div>
      ) : (
        <div className="fetch-error-info">
          Sorry no info, {discountsFetchError ? discountsFetchError : ""}
        </div>
      )}
    </Container>
  )
}

export default Promotions
