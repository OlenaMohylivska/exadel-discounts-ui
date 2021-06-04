import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import './styles.css';

function Discounts() {
  return (
    <Card className="product-card">
      <Card.Subtitle className="product-actuality">expires in 22:50:43</Card.Subtitle>
      <Card.Title className="mb-3">Card title</Card.Title>
      <Card.Img
        variant="top"
        src="https://via.placeholder.com/600/24f355" />
      <Card.Body className="p-0">
        <div className="product-description">
          <Card.Text className="product-feedback">
            Some quick example text to build on the card title.
          </Card.Text>
          <Card.Text className="product-discount">
            10%
          </Card.Text>
        </div>
        <div className="product-footer">
          <StarRatings
            starDimension="27px"
            starSpacing="5px" />
          <Button
            className="order-btn"
            variant="primary">
            Order
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Discounts

Discounts.propTypes = {
  title: PropTypes.string
}
