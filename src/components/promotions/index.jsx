import React, { useState, useEffect, useContext } from "react"
import { Container, Form, Button, Spinner } from "react-bootstrap"
import Loupe from "components/icons/Loupe"
import axiosInstance from "components/api"
import { useHistory, useRouteMatch } from "react-router-dom"
import "./styles.scss"
import PromotionInfo from "components/promotionInfo"
import { Context } from "store/context"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const Promotions = () => {
  const [discounts, setDiscounts] = useState([])
  const [discountsFetchError, setDiscountsFetchError] = useState(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { path } = useRouteMatch("/admin")
  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])

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
    history.push(`${path}/add-item`)
  }

  return (
    <Container className="my-4">
      <div className="col-lg-12 col-md-12 mb-4 search-container-wrapper">
        <div className="col-lg-10 col-md-9">
          <div className="position-relative w-100">
            <label className="w-100">
              <div className="search-icon">
                <Loupe />
              </div>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="Enter your search" />
                </Form.Group>
              </Form>
            </label>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 text-end">
          <Button
            variant="primary"
            className="add-discount-btn"
            onClick={newDiscountHandler}
          >
            Add new discount
          </Button>
        </div>
      </div>
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
