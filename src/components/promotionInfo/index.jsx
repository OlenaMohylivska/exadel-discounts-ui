import React, { useState, useEffect } from "react"
import { Container, Card, Button } from "react-bootstrap"
import StarRatings from "react-star-ratings"
import PropTypes from "prop-types"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import "./styles.scss"
import moment from "moment"
import axiosInstance from "components/api"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL
const discountDefaultImg = "https://img.icons8.com/plasticine/2x/no-image.png"

const PromotionInfo = ({ elem }) => {
  const [imgName, setImgName] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)
  const formattedData = moment(elem.periodEnd).format("MMM Do YYYY")

  const history = useHistory()
  const { path } = useRouteMatch()

  useEffect(async () => {
    await axiosInstance
      .get(`${baseUrl}/api/images`)
      .then((response) => setImgName(response.data.name))
  }, [elem])
  useEffect(async () => {
    await axiosInstance
      .get(`${baseUrl}/api/images/${imgName}`)
      .then((response) => setImgUrl(response.data))
  }, [elem])

  let blob = new Blob([imgUrl], { type: "image/png" })
  const url = blob && URL.createObjectURL(blob)

  const updateItemHandler = () => {
    history.push(`${path}/edit-item/${elem.id}`)
  }

  return (
    <Container className="discount-wrapper">
      <Card className=" shadow product-card border-0">
        <Link
          key={elem.id}
          to={{
            pathname: `${path}/edit-item/${elem.id}`,
          }}
        >
          <Card.Subtitle className="product-actuality text-muted">
            expires in {formattedData}
          </Card.Subtitle>
          <Card.Title className="mb-3 card-title">{elem.name}</Card.Title>
          <Card.Img
            variant="top"
            className="product-image"
            src={url ? url : discountDefaultImg}
          />
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
    imageId: PropTypes.number,
    periodEnd: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string,
    rate: PropTypes.number,
  }),
}
