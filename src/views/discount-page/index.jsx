import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router"
import { Button } from "react-bootstrap"
import StarRatings from "react-star-ratings"
import { axiosInstance } from "components/api"
import FetchError from "../../components/fetch-error"
import "./styles.scss"
import {
  Shop,
  People,
  BookmarkHeartFill,
  Globe,
  BackspaceReverse,
  EmojiLaughing,
} from "react-bootstrap-icons"
import moment from "moment"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const DiscountPage = () => {
  const [discount, setDiscount] = useState(null)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const location = useLocation()
  const { image } = location.state ? location.state : ""
  const { id } = useParams()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState(null)
  const [allReviews, setAllReviews] = useState([])

  const fetchData = async () => {
    setLoading(true)
    try {
      await axiosInstance
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
    setLoading(true)
    try {
      axiosInstance
        .get(`${baseUrl}/api/discounts/${id}/reviews`)
        .then((response) => {
          setAllReviews(response.data)
        })
      setLoading(false)
    } catch (e) {
      setErrorMessage(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setReview({
      rate: rating,
      comment: "",
      date: new Date(),
      discount: discount,
      employee: {
        id: 2,
        login: "E00002",
        location: null,
        role: "USER",
      },
    })
  }, [rating])

  const handleRating = (value) => {
    setRating(value)
  }

  const addReview = () => {
    axiosInstance.post(baseUrl + "/api/reviews", review)
    // setReviewText("")
    setRating(0)
  }

  return (
    <>
      {loading ? <div>Loading</div> : ""}
      {discount ? (
        <div className="container discount-container flex-wrap">
          <div className="col-lg-6 col-md-12">
            <div className="img-container">
              <img src={image} className="discount-image" alt="discount-img" />
            </div>

            <div>
              <div className="action">
                <Button
                  className="w-25 d-flex align-self-end justify-content-center"
                  onClick={() => setShow(!show)}
                  variant="primary"
                >
                  Order
                </Button>
                <div className="feedback-area">
                  <div>
                    <StarRatings
                      starDimension="27px"
                      starSpacing="5px"
                      rating={rating}
                      changeRating={handleRating}
                      starRatedColor="#FFD700"
                    />
                  </div>
                  <Button
                    className="d-flex align-self-center mt-3"
                    disabled={rating === 0}
                    variant="dark"
                    onClick={() => {
                      addReview()
                    }}
                  >
                    Leave feedback
                  </Button>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <p className={`${!show ? "hide" : "display"}`}>
                  {discount.promoCode}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="discount-subtitle">
              <Shop className="discount-icon" />
              Discount Name:&nbsp;
              <span className="discount-info">{discount.name}</span>
            </div>
            <div className="discount-subtitle">
              <People className="discount-icon" />
              Company:&nbsp;
              <span className="discount-info">
                {discount.company ? discount.company.name : ""}
              </span>
            </div>
            <div className="discount-subtitle">
              <BookmarkHeartFill className="discount-icon" />
              Tags:
              <span className="discount-info">
                {discount.tags.map((tag) => ` ${tag.name};`)}
              </span>
            </div>
            <div className="discount-subtitle">
              <Globe className="discount-icon" />
              Location:&nbsp;
              <span className="discount-info">
                {discount.country.cities.map((city) => `${city.name} `)}
              </span>
            </div>
            <div className="discount-subtitle">
              <BackspaceReverse className="discount-icon" />
              Expire at:&nbsp;
              <span className="discount-info">
                {moment(discount.periodEnd).format("MMM Do YYYY")}
              </span>
            </div>
            <span className="discount-subtitle">
              <EmojiLaughing className="discount-icon" />
              Description:&nbsp;
              <span className="discount-info">{discount.description}</span>
            </span>

            <div>
              {allReviews.length ? (
                <div>
                  <span className="discount-subtitle">Reviews:</span>
                  {allReviews.map((review) => {
                    return (
                      <div key={review.id} className="review">
                        <div className="d-flex justify-content-between">
                          <div className="m-2">
                            <img
                              className="user-image"
                              src="https://i.pinimg.com/originals/17/56/8f/17568fcd478e0699067ca7b9a34c702f.png"
                              alt="user-image"
                            />
                            <p className="d-inline mx-3">
                              {review.employee.login}
                            </p>
                          </div>

                          <p>{review.employee.location || ""}</p>
                          <div className="align-self-center">
                            <StarRatings
                              starDimension="24px"
                              starSpacing="4px"
                              rating={review.rate}
                              starRatedColor="#FFD700"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="discount-no-reviews">
                  No reviews available yet. Please, check back later!
                </p>
              )}
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
