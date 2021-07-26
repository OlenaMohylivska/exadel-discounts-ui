import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Card, Button, Badge } from "react-bootstrap"
import moment from "moment"
import StarRatings from "react-star-ratings"
import "./styles.scss"
import { Link, Redirect } from "react-router-dom"
import { Heart, HeartFill } from "react-bootstrap-icons"
import axiosInstance from "components/api"
import discountDefaultImg from "../../assets/no-image.png"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

function ProductCard({ elem, isOrdered, setIsFavorite, isFavorite }) {
  const [order, setOrder] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const orderToggle = () => {
    setOrder(true)
  }
  const favoriteSetter = async () => {
    await axiosInstance.post(`/api/employee/favorites/${elem.id}`)
    setFavorite(true)
  }

  const favoriteUnsetter = async () => {
    await axiosInstance.put(`/api/employee/favorites/${elem.id}`)
    setFavorite(false)
    setIsFavorite([...isFavorite, 1])
  }

  useEffect(() => {
    axiosInstance.post(`/api/employee/favorites`, {}).then((response) => {
      response.data.content.map((el) => el.id === elem.id && setFavorite(true))
    })
  }, [])
  favorite
  return (
    <Card className=" shadow product-card">
      <div className="card-title-items">
        <Card.Title className="mb-3 card-title">{elem.name}</Card.Title>
        {favorite ? (
          <HeartFill className="fav-icon" onClick={favoriteUnsetter} />
        ) : (
          <Heart className="fav-icon" onClick={favoriteSetter} />
        )}
      </div>
      <Link
        key={elem.id}
        to={{
          pathname: `/discount/${elem.id}`,
        }}
      >
        <div className="image-block">
          <Card.Img
            variant="top"
            className="product-image"
            src={
              elem.nameImage
                ? `${baseUrl}/api/images/${elem.nameImage}`
                : discountDefaultImg
            }
          />
          <Badge className="expiration-badge badge-pill">
            expires {moment(elem.periodEnd).format("MMM Do YYYY")}
          </Badge>
        </div>
      </Link>

      <Card.Body className="p-0 d-flex flex-column justify-content-between">
        <div className="product-description">
          <Card.Text className="product-feedback">{elem.description}</Card.Text>
        </div>
        <div className="product-footer">
          <StarRatings
            starDimension="20px"
            starSpacing="5px"
            rating={elem.rate ?? 0}
            starRatedColor="#FFD700"
          />
          {!isOrdered && <Button
            className="w-100 mt-3"
            variant="primary"
            onClick={orderToggle}
          >
            Order
          </Button>}
          {order && <Redirect to={`/order-confirmation/${elem.id}`} />}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

ProductCard.propTypes = {
  elem: PropTypes.shape({
    nameImage: PropTypes.string,
    periodEnd: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    img: PropTypes.string,
    rate: PropTypes.number,
    imageId: PropTypes.number,
  }),
  isOrdered: PropTypes.bool,
  setIsFavorite:PropTypes.bool,
  isFavorite:PropTypes.array,
}
