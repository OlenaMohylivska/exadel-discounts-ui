import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router"
import { Button, Form } from "react-bootstrap"
import StarRatings from "react-star-ratings"
import * as axios from "axios"
import FetchError from "../../components/fetch-error"
import "./styles.css"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const DiscountPage = () => {
  const [discount, setDiscount] = useState(null)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const location = useLocation()
  const { image } = location.state ? location.state : ""
  const { id } = useParams()
  const [reviewText, setReviewText] = useState("")
  const [review, setReview] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      await axios
        .get(`${baseUrl}/api/discounts/${id}`)
        .then((response) => setDiscount(response.data))
      setLoading(false)
    } catch (e) {

      setErrorMessage(e.message)

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setReview({
      rate: 5,
      comment: reviewText,
      date: 1274389200000,
      discount: discount,
      employee: {
        id: 2,
        login: "E00002",
        location: null,
        role: "USER"
      }
    })
  }, [reviewText])

  const handleReviewText = e => {
    setReviewText(e.target.value)
  }

  const addReview = () => {
    axios.post(baseUrl + "/api/reviews", review)
    setReviewText("")
  }
  return (
    <>
      {loading ? <div>Loading</div> : ""}
      {discount ? (
        <div className="container discount-container d-flex align-items-center flex-wrap">
          <div className="col-lg-6 col-md-12">
            <div className="img-container">
              <img src={image} className="discount-image" alt="discount-img" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <h3>Discount Name:{discount.name}</h3>
            <h4>
              Company:
              {discount.company ? discount.company.name : ""}
            </h4>
            <h4>Tags:{discount.tags.map((tag) => ` ${tag.name};`)}</h4>
            <h4>Location:</h4>
            <h4>
              Expired to:
              {new Date(discount.periodEnd)
                .toISOString()
                .split(":")
                .splice(0, 1)
                .join("")
                .split("")
                .splice(0, 10)
                .join("")
                .split("-")
                .reverse()
                .join("-")}
            </h4>
            <h4>Description:</h4>
            <p>{discount.description}</p>
            <div className="rates">
              <StarRatings starDimension="27px" starSpacing="5px" />
            </div>
            <div className="action">
              <div>
                <Form.Group>
                  <Form.Control className="mb-3" as="textarea" rows={4} cols={50} value={reviewText} onChange={handleReviewText}>

                  </Form.Control>

                </Form.Group>
                <Button className="d-flex align-self-start" variant="dark" onClick={() => { addReview() }}>Leave feedback</Button>
              </div>
              <Button className="w-25 d-flex align-self-end justify-content-center" onClick={() => setShow(!show)} variant="primary">
                Order
              </Button>

            </div>
            <div className="d-flex justify-content-end">
              <p className={`${!show ? "hide" : "display"}`}>
                {discount.promoCode}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <FetchError error={errorMessage ? errorMessage : ""} />
      )}
    </>
  )
}

export default DiscountPage



