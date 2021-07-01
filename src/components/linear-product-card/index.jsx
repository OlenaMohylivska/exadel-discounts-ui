import React from 'react'
import { Card, Button } from 'react-bootstrap'
import propTypes from 'prop-types'
import { SuitHeartFill } from 'react-bootstrap-icons'
import './styles.css'

const LinearProductCard = ({discount, isFavouritePage, discounts, setDiscounts}) => {

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
    const periodDate = periodEnd.getDate() < 10 ? "0" + periodEnd.getDate() : periodEnd.getDate()
    let perionMonth = periodEnd.getMonth() + 1
    perionMonth = perionMonth < 10 ? "0" + perionMonth : perionMonth
    return `${periodDate}-${perionMonth}-${periodEnd.getFullYear()}`
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Card className="d-flex flex-lg-row flex-md-row flex-sm-column w-100 mt-3 p-2 align-items-center position-relative">
            <Card.Img className="col-lg-2 col-md-2 image" src="https://via.placeholder.com/600/24f355" />
            <Card.Body className="d-lg-flex d-md-flex d-sm-block flex-lg-row flex-md-row flex-sm-column">
              <div className="col-lg-10 col-md-9 col-sm-12 d-flex flex-column justify-content-center">
                <Card.Title>{discount.name}</Card.Title>
                <Card.Text className=" h-100 mb-2">{discount.description}</Card.Text>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-12 d-flex flex-column">
                <Card.Title className="text-lg-center text-sm-start">Expires in</Card.Title>
                <Card.Subtitle className="text-lg-center text-sm-start text-muted">{formattedData(discount.periodEnd)}</Card.Subtitle>
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