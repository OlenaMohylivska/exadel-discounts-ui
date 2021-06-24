import React from "react"
import PropTypes from "prop-types"
import { Card, Button } from "react-bootstrap"
import StarRatings from "react-star-ratings"

import "./styles.css"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function ProductCard({ elem }) {
  const testedData = new Date(elem.periodEnd)
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
    <Card className='product-card'>
      <Link
        className='text-decoration'
        key={elem.id}
        to={`/discount/${elem.id}`}>
        <Card.Subtitle className='product-actuality'>
          expires in {testedData}
        </Card.Subtitle>
        {/* eslint-disable-next-line react/prop-types */}
        <Card.Title className='mb-3'>{elem.name}</Card.Title>
        <Card.Img variant='top' src='https://via.placeholder.com/600/24f355' />
      </Link>
      <Card.Body className='p-0 d-flex flex-column justify-content-between'>
        <div className='product-description'>
          {/* eslint-disable-next-line react/prop-types */}
          <Card.Text className='product-feedback'>{elem.description}</Card.Text>
          <Card.Text className='product-discount'>10%</Card.Text>
        </div>
        <div className='product-footer'>
          <StarRatings starDimension='27px' starSpacing='5px' />
          <Button className='order-btn' variant='primary'>
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
    periodEnd: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
  }),
}
