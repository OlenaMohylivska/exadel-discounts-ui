import React from "react"
import { Container, Card, Button } from "react-bootstrap"
import StarRatings from "react-star-ratings"
import PropTypes from "prop-types"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import "./styles.scss"

const PromotionInfo = ({ elem }) => {
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

  const history = useHistory()
  const { path } = useRouteMatch()


  const updateItemHandler = () => {
    history.push(`${path}/edit-item/${elem.id}`)
  }

  return (
    <Container className="discount-wrapper">
      <Card className=" shadow product-card">
        <Link
          key={elem.id}
          to={{
            pathname: `/update-discount/${elem.id}`,
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
          <div>
            <Card.Text className="product-description">
              {elem.description}
            </Card.Text>
          </div>

          <div className="product-footer">
            <StarRatings
              starDimension="27px"
              starSpacing="5px"
              rating={elem.rate}
              starRatedColor="#FFD700"
            />
            <Button variant="dark" onClick={updateItemHandler}>
              Update
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default PromotionInfo

PromotionInfo.propTypes = {
  elem: PropTypes.shape({
    id: PropTypes.number,
    periodEnd: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string,
    rate: PropTypes.number,
  }),
}
