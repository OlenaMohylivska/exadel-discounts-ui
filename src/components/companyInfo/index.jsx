import React from "react"
import { Card, Button } from "react-bootstrap"
import PropTypes from "prop-types"

const CompanyInfo = ({ name }) => {

  return (
    <div className="col-lg-12">
      <Card className="d-flex flex-lg-row flex-md-row flex-sm-column w-100 mt-3 p-2 align-items-center position-relative">
        <Card.Img
          className="col-lg-2 col-md-2 image"
          src="https://via.placeholder.com/600/24f355"
        />
        <Card.Body className="d-lg-flex d-md-flex d-sm-block flex-lg-row flex-md-row flex-sm-column">
          <div className="col-lg-10 col-md-9 col-sm-12 d-flex flex-column justify-content-center">
            <Card.Title>{name}</Card.Title>
          </div>
        </Card.Body>
        <Button
          variant="primary"
          className="h-100 px-4 align-self-center"
        >
          Update company
        </Button>
      </Card>
    </div>
  )
}

export default CompanyInfo

CompanyInfo.propTypes = {
  name: PropTypes.object,
}
