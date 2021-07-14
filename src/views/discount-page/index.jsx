import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { Button, Col, Container, Row, ProgressBar } from "react-bootstrap"
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

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const DiscountPage = () => {
  const [discount, setDiscount] = useState(null)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const { id } = useParams()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState(null)
  const [allRating, setAllRating] = useState({})
  const images = useContext(Context)

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
        .then(response => {
          setAllRating({
            rating: Object.keys(response.data).reverse(),
            ratingCount: Object.values(response.data).reverse(),
            maximalCount: Math.max.apply(null, Object.values(response.data).map(item => Number(item))),
          })
          setLoading(false)
        })
    }
    catch (e) {
      setErrorMessage(e.message)
    } finally {
      setLoading(false)
    }
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
    let sum = 0
    let reviewsCount = 0
    for (let i = 0; i < allRating.rating.length; i++) {
      sum += allRating.rating[i] * allRating.ratingCount[i]
      reviewsCount += allRating.ratingCount[i]
    }
    return +(sum / reviewsCount).toFixed(2)
  }
  const handleRating = (value) => {
    setRating(value)
  }

  const addReview = () => {
    axiosInstance.post(baseUrl + "/api/reviews", review)
    setRating(0)
  }

  return (
    <>
      {loading ? <div>Loading</div> : ""}
      {discount ? (

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
                <Globe className="discount-icon" />
                Location:&nbsp;
                <div className="discount-info">
                  {discount.countries &&
                    discount.countries.map((country) =>
                      country.cities.map((city) => (
                        <div key={city.id}>{city.name}</div>
                      ))
                    )}
                </div>
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
                <span className="discount-subtitle">Reviews:</span>
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
                  </Col >
                  <Col className="bars-container">

                    <div className="rating-numbers">
                      {allRating.rating.map((rating, index) => {
                        return (
                          <div key={index} className="rating-numbers-item">{rating}</div>
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
                              animated />
                          </div>
                        )
                      })
                      }
                    </div>
                  </Col>
                </Row>
              </div>

            </Col>
            <Col lg={6}>
              <div className="img-container">
                <img src={images.productImages[discount.id - 1] ?? "https://i.stack.imgur.com/y9DpT.jpg"} className="discount-image" alt="discount-img" />
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
                </div>
                <div className="d-flex justify-content-end">
                  <p className={`${!show ? "hide" : "display"}`}>
                    {discount.promoCode}
                  </p>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      ) : (
        <FetchError error={errorMessage ? errorMessage : ""} />
      )}
    </>
  )
}

export default DiscountPage
