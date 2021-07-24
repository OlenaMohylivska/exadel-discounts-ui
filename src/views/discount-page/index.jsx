import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  ProgressBar,
} from "react-bootstrap"
import StarRatings from "react-star-ratings"
import axiosInstance from "components/api"
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
import { Context } from "store/context"
import PreviewGoogleMap from "components/preview-google-map/preview-google-map"
import { Redirect } from "react-router-dom"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const DiscountPage = () => {
  const [discount, setDiscount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const { id } = useParams()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState(null)
  const [allRating, setAllRating] = useState({})
  const { bindToken } = useContext(Context)
  const [order, setOrder] = useState(false)

  const addresssMapper = (el) => {
    return `${el.address} ${el.city.name} ${el.city.country.name}`
  }

  const discountAddresses = discount && discount.addresses.map(addresssMapper)
  const discountCompanyAddresses =
    discount && discount.company.addresses.map(addresssMapper)
  const fullAddressLocations =
    discount && discountAddresses.length
      ? discountAddresses
      : discountCompanyAddresses

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

  const getReviews = () => {
    setLoading(true)
    try {
      axiosInstance.get(`/api/discounts/${id}/reviews`).then((response) => {
        setAllRating({
          rating: Object.keys(response.data).reverse(),
          ratingCount: Object.values(response.data).reverse(),
          maximalCount: Math.max.apply(
            null,
            Object.values(response.data).map((item) => Number(item))
          ),
        })
        setLoading(false)
      })
    } catch (e) {
      setErrorMessage(e.message)
    }
  }

  useEffect(() => {
    bindToken()
  }, [])

  useEffect(() => {
    fetchData()
    getReviews()
  }, [])

  useEffect(() => {
    axiosInstance.put(`api/discounts/${id}/views`)
  }, [])

  useEffect(() => {
    getReviews()
  }, [rating, review])

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

  const countAverage = () => {
    if (allRating) {
      let sum = 0
      let reviewsCount = 0
      for (let i = 0; i < allRating.rating.length; i++) {
        sum += allRating.rating[i] * allRating.ratingCount[i]
        reviewsCount += allRating.ratingCount[i]
      }
      return +(sum / reviewsCount).toFixed(2)
    }
  }

  const handleRating = (value) => {
    setRating(value)
  }

  const addReview = () => {
    axiosInstance.post(baseUrl + "/api/reviews", review)
    setRating(0)
  }

  const orderToggle = () => {
    setOrder(true)
  }

  return (
    <>
      {loading && (
        <div className="spin-container">
          <Spinner className="spin-loader" animation="border" />
        </div>
      )}
      {discount && (
        <Container>
          <Row className="discount-page-container">
            <Col lg={6}>
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
              <div className="discount-subtitle">
                <Globe className="discount-icon" />
                Location:&nbsp;
                {fullAddressLocations ? (
                  <div className="discount-info">
                    {fullAddressLocations.map((location) => (
                      <div className="mx-4 my-2" key={location}>
                        {location}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="discount-info">No information</span>
                )}
              </div>
              {fullAddressLocations && (
                <PreviewGoogleMap allAddresses={fullAddressLocations} />
              )}
            </Col>
            <Col lg={6}>
              <div className="img-container">
                <img
                  src={`https://sandbox-team5.herokuapp.com/api/images/${discount.nameImage}`}
                  className="discount-image"
                  alt="discount-img"
                />
              </div>
              <Row className="reviews-container">
                <Col className="stars-container">
                  <div className="average-rating">
                    {countAverage() ? countAverage() : 0}
                  </div>

                  <div>
                    <StarRatings
                      starDimension="20px"
                      starSpacing="4px"
                      rating={countAverage() ? countAverage() : 0}
                      starRatedColor="#FFD700"
                    />
                  </div>
                </Col>
                <Col className="bars-container">
                  <div className="rating-numbers">
                    {allRating.rating.map((rating, index) => {
                      return (
                        <div key={index} className="rating-numbers-item">
                          {rating}
                        </div>
                      )
                    })}
                  </div>

                  <div>
                    {allRating.ratingCount.map((ratingCount, index) => {
                      return (
                        <div key={index} className="progress-bar-container">
                          <ProgressBar
                            title={ratingCount}
                            max={allRating.maximalCount}
                            now={ratingCount}
                            variant="success"
                          />
                        </div>
                      )
                    })}
                  </div>
                </Col>
              </Row>
              <div>
                {localStorage.getItem('role') === "USER" && <div className="action">
                  <Button
                    className="w-25 d-flex align-self-end justify-content-center"
                    onClick={orderToggle}
                    variant="primary"
                  >
                    Order
                  </Button>
                  {order && <Redirect to={`/order-confirmation/${id}`} />}
                  <div className="feedback-area">
                    <div>
                      <StarRatings
                        starDimension="27px"
                        starSpacing="5px"
                        rating={rating ?? 0}
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
                </div>}
              </div>
            </Col>
          </Row>
        </Container>
      )}
      {errorMessage && <FetchError error={errorMessage} />}
    </>
  )
}

export default DiscountPage
