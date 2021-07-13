import React from 'react'
import { Card, Button } from 'react-bootstrap'
import propTypes from 'prop-types'
import { SuitHeartFill } from 'react-bootstrap-icons'
import StarRatings from 'react-star-ratings'
import './styles.css'
import { Link } from 'react-router-dom'
import moment from "moment"

const LinearProductCard = ({ discount, buttonText, discounts, setDiscounts }) => {
  const toggleFavourite = id => {
    setDiscounts(
      discounts.map(el => {
        if (el.id === id) {
          el.isFavourite = !el.isFavourite
        }
        return el
      })
    )
  }

  return (
    <div className="card-wrapper">
      <div className="mt-3">
        <Card className="p-3 position-relative shadow">
          <Link to={`/discount/${discount.id}`} key={discount.id}>
            <Card.Body>
              <div className="d-flex flex-row">
                <Card.Subtitle className="text-secondary">
                  Expires in: {moment(discount.discount ? discount.discount.periodEnd : discount.periodEnd).format("MMM Do YYYY")}
                </Card.Subtitle>
              </div>
              <div>
                <Card.Title className="my-4 text-center">{discount.discount ? discount.discount.name : discount.name}</Card.Title>
                <Card.Img variant="top" className="prod-image" src={discount.image} />
                <Card.Subtitle className="my-3 text-muted discount-description">
                  {discount.discount ? discount.discount.description : discount.description}
                </Card.Subtitle>
              </div>
              <div className="d-flex justify-content-center">
                <StarRatings starDimension="27px" starSpacing="5px" rating={discount.rate ?? 0} starRatedColor="gold" />
              </div>
            </Card.Body>
            {buttonText && <div className="d-flex justify-content-center">
              <Button variant="primary" className="h-100 px-4">{buttonText}</Button>
            </div>}
          </Link>
          {SuitHeartFill &&
            <div className="star-wrapper">
              {<SuitHeartFill onClick={() => toggleFavourite(discount.id)} className={discount.isFavourite ? "favourite" : "common"} />}
            </div>
          }
        </Card>
      </div>
    </div>
  )
}

LinearProductCard.propTypes = {
  buttonText: propTypes.string,
  discounts: propTypes.array,
  setDiscounts: propTypes.func,
  discount: propTypes.object
}

export default LinearProductCard
