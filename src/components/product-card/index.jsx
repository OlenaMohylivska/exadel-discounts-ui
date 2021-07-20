import React from "react"
import PropTypes from "prop-types"
import { Card, Button } from "react-bootstrap"
import moment from "moment"
import StarRatings from "react-star-ratings"
import "./styles.scss"
import { Link } from "react-router-dom"
import { SuitHeart } from "react-bootstrap-icons"

function ProductCard({ elem }) {
  return (
    <Card className=" shadow product-card col-sm-12">
      <Link
        key={elem.id}
        to={{
          pathname: `/discount/${elem.id}`,
          state: {
            image: elem.img,
          },
        }}
      >
        <Card.Subtitle className="product-actuality text-muted">
          expires in {moment(elem.periodEnd).format("MMM Do YYYY")}
        </Card.Subtitle>
        <Card.Title className="mb-3 card-title">{elem.name}</Card.Title>

        <Card.Img
          variant="top"
          className="product-image"
          src={`https://sandbox-team5.herokuapp.com/api/images/${elem.nameImage}`}
        />
      </Link>
      <Card.Body className="p-0 d-flex flex-column justify-content-between">
        <div className="product-description">
          <Card.Text className="product-feedback">{elem.description}</Card.Text>
          <SuitHeart className="fav-icon"/>
        </div>

        <div className="product-footer">
          <StarRatings
            starDimension="27px"
            starSpacing="5px"
            rating={elem.rate}
            starRatedColor="#FFD700"
          />

          <Button className="w-100 mt-3" variant="primary">
            Order
          </Button>
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
