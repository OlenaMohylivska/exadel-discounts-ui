import React, { useState } from "react"
import PropTypes from "prop-types"
import { Card, Button, Badge } from "react-bootstrap"
import moment from "moment"
import StarRatings from "react-star-ratings"
import "./styles.scss"
import { Link, Redirect } from "react-router-dom"
import { Heart, HeartFill } from "react-bootstrap-icons"

const discountDefaultImg = "https://img.icons8.com/plasticine/2x/no-image.png"
const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

function ProductCard({ elem }) {
  const [order, setOrder] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const orderToggle = () => {
    setOrder(true)
  }
  const favoriteToggler = () => {
    setFavorite(!favorite)
  }

  return (
    <Card className=" shadow product-card">
      <Link
        key={elem.id}
        to={{
          pathname: `/discount/${elem.id}`,
        }}
      >
        <Card.Title className="mb-3 card-title">{elem.name}</Card.Title>
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
          {favorite ? (
            <HeartFill className="fav-icon" onClick={favoriteToggler} />
          ) : (
            <Heart className="fav-icon" onClick={favoriteToggler} />
          )}
        </div>
        <div className="product-footer">
          <StarRatings
            starDimension="20px"
            starSpacing="5px"
            rating={elem.rate}
            starRatedColor="#FFD700"
          />
          <Button
            className="w-100 mt-3"
            variant="primary"
            onClick={orderToggle}
          >
            Order
          </Button>
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
    periodEnd: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    img: PropTypes.string,
    rate: PropTypes.number,
    imageId: PropTypes.number,
  }),
}
