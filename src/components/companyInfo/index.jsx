import React, { useEffect, useContext } from "react"
import { Container, Card, Button } from "react-bootstrap"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import "./styles.scss"
import { Context } from "store/context"
import companyDefaultImg from "../../assets/companyDefaultImg.png"
const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const CompanyInfo = ({ elem }) => {
  const history = useHistory()

  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])

  const updateItemHandler = () => {
    history.push(`edit-company/${elem.id}`)
  }

  return (
    <Container className="company-wrapper">
      <Card className="shadow product-card d-flex flex-column align-items-center card-size">
        <Card.Title className="mb-3 card-title d-flex justify-content-center">
          {elem.name}
        </Card.Title>
        <Card.Img
          variant="top"
          className="product-image mb-2 logo-style"
          src={
            elem.nameImage
              ? `${baseUrl}/api/images/${elem.nameImage}`
              : companyDefaultImg
          }
        />
        <Card.Body className="p-0 d-flex flex-column justify-content-between w-100 ">
          <div className="product-footer text-center">
            <Button
              className="company-update-btn"
              variant="primary"
              onClick={updateItemHandler}
            >
              Update
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CompanyInfo

CompanyInfo.propTypes = {
  elem: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    nameImage: PropTypes.string,
  }),
}
