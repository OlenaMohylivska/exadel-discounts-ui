import React from "react"
import PropTypes from "prop-types"
import { Card, Button } from "react-bootstrap"
// import StarRatings from "react-star-ratings"
import "./styles.css"
import { Link } from "react-router-dom"

function ProductCard({ elem }) {
  const formattedData = new Date(elem.periodEnd)
    .toISOString()
    .split(":")
    .splice(0, 1)
    .join("")
    .split("")
    .splice(0, 10)
    .join("")
    .split("-")
    .reverse()
    .join("-")

  return (
    <Card className=" shadow product-card">
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
          expires in {formattedData}
        </Card.Subtitle>
        <Card.Title className="mb-3 card-title">{elem.name}</Card.Title>
        <Card.Img variant="top" className="product-image" src={elem.img} />
      </Link>
      <Card.Body className="p-0 d-flex flex-column justify-content-between">
        <div className="product-description">
          <Card.Text className="product-feedback">{elem.description}</Card.Text>
        </div>

        <div className="product-footer">
          {/* <StarRatings
            starDimension="27px"
            starSpacing="5px"
            rating={elem.rate}
            starRatedColor="#FFD700"
          /> */}
          <Button variant="dark">Order</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

ProductCard.propTypes = {
  elem: PropTypes.shape({
    periodEnd: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    img: PropTypes.string,
    rate: PropTypes.number,
  }),
}
