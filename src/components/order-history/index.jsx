import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './styles.css';

const OrderHistory = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Card className="d-flex flex-lg-row flex-md-row flex-sm-column w-100 mt-3 p-2 align-items-center">
            <Card.Img className="col-lg-2 col-md-2 image" src="https://via.placeholder.com/600/24f355" />
            <Card.Body className="d-lg-flex d-md-flex d-sm-block flex-lg-row flex-md-row flex-sm-column">
              <div className="col-lg-10 col-md-9 col-sm-12 d-flex flex-column justify-content-center">
                <Card.Title>Card Title</Card.Title>
                <Card.Text className=" h-100 mb-2">
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-12 d-flex flex-column">
                <Card.Title className="text-lg-center text-sm-start">Date</Card.Title>
                <Card.Subtitle className="text-lg-center text-sm-start text-muted">05.06.2021</Card.Subtitle>
              </div>
            </Card.Body>
            <Button variant="primary" className="h-100 align-self-center">Leave feedback</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory