import React from "react"
import PropTypes from "prop-types"
import { Card, Button } from "react-bootstrap"

import StarRatings from "react-star-ratings"
import "./styles.css"
import { Link } from "react-router-dom"
import moment from "moment"
function ProductCard({ elem }) {

  // useEffect(() => {
  //   elem.imageId &&
  //     axiosInstance
  //       .get(`/api/images/${elem.imageId}`)
  //       .then((response) => setImg(response.data))
  // }, [elem])

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

        {
          <Card.Img
            variant="top"
            className="product-image"
            src={`https://sandbox-team5.herokuapp.com/api/images/${elem.imageId}`}
          />
        }
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
          <Link to={`/discount/${elem.id}`}><Button className="ms-3" variant="dark">Order</Button></Link>
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
    imageId: PropTypes.number,
  }),
}
