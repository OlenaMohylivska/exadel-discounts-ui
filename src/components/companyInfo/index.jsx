import React from "react"
import { Container, Card, Button } from "react-bootstrap"
import PropTypes from "prop-types"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import "./styles.scss"

const CompanyInfo = ({ name, id }) => {
  const history = useHistory()
  const { path } = useRouteMatch()

  const updateItemHandler = () => {
    history.push(`${path}/edit-company/${id}`)
  }

  return (
    <Container className="company-wrapper">
      <Card className="shadow product-card d-flex flex-column align-items-center card-size">
        <Link
          key={id}
          to={{
            pathname: `/edit-company/${id}`,
          }}
        >
          <Card.Title className="mb-3 card-title d-flex justify-content-center">
            {name}
          </Card.Title>
          <Card.Img
            variant="top"
            className="product-image mb-5"
            src="https://zo.ua/uploads/no-logo.png"
          />
        </Link>
        <Card.Body className="p-0 d-flex flex-column justify-content-between">
          <div className="product-footer">
            <Button variant="dark" onClick={updateItemHandler}>
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
  name: PropTypes.string,
  id: PropTypes.number,
}
