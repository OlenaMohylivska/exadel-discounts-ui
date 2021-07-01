import React from 'react'
import { Card, Button } from 'react-bootstrap'
import propTypes from 'prop-types'
import { SuitHeartFill } from 'react-bootstrap-icons'
import StarRatings from "react-star-ratings"
import './styles.css'

const LinearProductCard = ({ discount, isFavouritePage, discounts, setDiscounts }) => {

  function toggleFavourite(id) {
    setDiscounts(
      discounts.map(el => {
        if (el.id === id) {
          el.isFavourite = !el.isFavourite
        }
        return el
      })
    )
  }

  const formattedData = (date) => {
    const periodEnd = new Date(date)
    const perionDate = periodEnd.getDate() < 10 ? "0" + periodEnd.getDate() : periodEnd.getDate()
    let perionMonth = periodEnd.getMonth() + 1
    perionMonth = perionMonth < 10 ? "0" + perionMonth : perionMonth
    return `${perionDate}-${perionMonth}-${periodEnd.getFullYear()}`
  }

  return (
    <div className="card-wrapper">
      <div className="f">

        <Card className="p-3 position-relative shadow">
          <Card.Body className="f">
            <div className="d-flex flex-row align-items-center">
              <Card.Subtitle className="f">Expires in: {formattedData(discount.periodEnd)} </Card.Subtitle>
            </div>
            <div>
              <Card.Title className="my-4 text-center">{discount.name}</Card.Title>
              <Card.Img variant="top" className="product-image" src={discount.img} />
              <Card.Subtitle className="my-3 text-muted discount-description">{discount.description}</Card.Subtitle>
            </div>

            <div className="d-flex justify-content-center">
              <StarRatings starDimension="27px" starSpacing="5px" rating={4.403} starRatedColor="gold" />
            </div>
          </Card.Body>
          <Button variant="primary" className="h-100 px-4 align-self-center">{isFavouritePage ? "Order" : "Leave feedback"}</Button>
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
  isFavouritePage: propTypes.bool,
  discounts: propTypes.array,
  setDiscounts: propTypes.func,
  discount: propTypes.object
}

export default LinearProductCard