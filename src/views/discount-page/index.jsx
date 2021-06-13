import React from 'react'
import { Button } from 'react-bootstrap'
import StarRatings from "react-star-ratings"
import './styles.css'

const DiscountPage = () => {
    return (
        <div className="container">
            <div className="col">
                <div className="img-container">img</div>
            </div>
            <div className="col">
                <h3>Discount Name:</h3>
                <h4>Company:</h4>
                <h4>Tags:</h4>
                <h4>Location:</h4>
                <h4>Expired to:</h4>
                <h4>Description:</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, ducimus dolores harum praesentium incidunt quia consectetur? Placeat a voluptatibus, facere provident necessitatibus quod sunt optio fugiat esse suscipit quae aliquam!</p>
                <div className="rates"><StarRatings starDimension='27px' starSpacing='5px' /></div>
                <div className="action">
                    <Button variant="primary">Order</Button>
                    <Button variant="dark">Feedbacks</Button>
                </div>
            </div>

        </div>
    )
}

export default DiscountPage