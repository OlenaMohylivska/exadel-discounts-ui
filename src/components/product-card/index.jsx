import React, {useState} from "react"
import PropTypes from "prop-types"
import { Card, Button } from "react-bootstrap"
import moment from "moment"
import StarRatings from "react-star-ratings"
import "./styles.scss"
<<<<<<< HEAD
import { Link, Redirect } from "react-router-dom"
// import OrderConfirm from "views/order-confirmation"

function ProductCard({ elem }) {
  const [order, setOrder] = useState(false)

  const orderToggle = () => {
    setOrder(true)
  }

=======
import { Link } from "react-router-dom"
import { SuitHeart } from "react-bootstrap-icons"

function ProductCard({ elem }) {
>>>>>>> 2a1f8638b99f52a45ab3317439d128ea393a4788
  return (
    <Card className=" shadow product-card col-sm-12">
      <Link
        key={elem.id}
        to={{
          pathname: `/discount/${elem.id}`,
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
<<<<<<< HEAD
          <Button variant="primary" onClick={orderToggle}>
            Order
          </Button>
          {order && <Redirect to={`/order-confirmation/${elem.id}`} />}
=======

          <Button className="w-100 mt-3" variant="primary">
            Order
          </Button>
>>>>>>> 2a1f8638b99f52a45ab3317439d128ea393a4788
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
