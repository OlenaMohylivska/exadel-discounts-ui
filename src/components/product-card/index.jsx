import React from "react"
import PropTypes from "prop-types"
import { Card, Button } from "react-bootstrap"
import StarRatings from "react-star-ratings"
import * as axios from "axios"
import "./styles.css"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function ProductCard({ elem }) {
  const deleteElem = () => {
    axios.delete(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/discounts/10`)
  }
  console.log(elem.id)
  return (
    <Card className='product-card'>
      <Link key={elem.id} to={`/discount/${elem.id}`}>
        <Card.Subtitle className='product-actuality'>
          expires in {elem.periodEnd}
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
          <Button
            onClick={() => deleteElem()}
            className='margin-left'
            variant='outline-dark'>
            Delete
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
