import React, { useState, useEffect, useContext } from "react"
import axiosInstance from "components/api"
import PropTypes from "prop-types"
import { Card, Button } from "react-bootstrap"
import StarRatings from "react-star-ratings"
import "./styles.css"
import { Link, Redirect } from "react-router-dom"
import moment from "moment"
import { Context } from "store/context"
function ProductCard({ elem }) {
  const [img, setImg] = useState(null)
  const [order, setOrder] = useState(false)
  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])
  const orderToggle = () => {
    setOrder(true)
  }

  useEffect(() => {
    axiosInstance
      .get(`/api/images/${elem.imageId}`)
      .then((response) => setImg(response.data))
  }, [elem])
  let blob = new Blob([img], { type: "image/jpeg" })
  const url = blob && URL.createObjectURL(blob)
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
          expires in {moment(elem && elem.periodEnd).format("MMM Do YYYY")}
        </Card.Subtitle>
        <Card.Title className="mb-3 card-title">{elem.name}</Card.Title>
        {url && <Card.Img variant="top" className="product-image" src={url} />}
      </Link>
      <Card.Body className="p-0 d-flex flex-column justify-content-between">
        <div className="product-description">
          <Card.Text className="product-feedback">{elem.description}</Card.Text>
        </div>
        <div className="product-footer">
          <StarRatings
            starDimension="24px"
            starSpacing="4px"
            rating={elem.rate ?? 0}
            starRatedColor="#FFD700"
          />
          <Button variant="dark" onClick={orderToggle}>
            Order
          </Button>
          {order ? <Redirect to={`/order-confirmation/${elem.id}`} /> : ""}
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

ProductCard.propTypes = {
  elem: PropTypes.shape({
    imageId: PropTypes.number,
    periodEnd: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    img: PropTypes.string,
    rate: PropTypes.number,
  }),
}
