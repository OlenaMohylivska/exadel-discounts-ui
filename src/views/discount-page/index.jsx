import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Button } from 'react-bootstrap'
import StarRatings from "react-star-ratings"
import * as axios from 'axios'
import './styles.css'




const DiscountPage = () => {
  const [discount, setDiscount] = useState(null)
  const [show, setShow] = useState(false)


  const { id } = useParams()
  const fetchData = async () => {
    axios.get(`http://sandbox-team5.herokuapp.com/api/discount/${id}`).then(response => setDiscount(response.data))
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log(discount)





  return (

    <>{discount &&
      <div className="container">
        <div className="col">
          <div className="img-container">img</div>
        </div>
        <div className="col">
          <h3>Discount Name:{discount.name}</h3>
          <h4>Company:</h4>
          <h4>Tags:</h4>
          <h4>Location:{discount.tags.map(tag => ` ${tag.name};`)}</h4>
          <h4>Expired to:{discount.periodEnd}</h4>
          <h4>Description:</h4>
          <p>{discount.description}</p>
          <div className="rates"><StarRatings starDimension='27px' starSpacing='5px' /></div>
          <div className="action">
            <Button onClick={() => setShow(!show)} variant="primary">Order</Button>
            <Button variant="dark">Feedbacks</Button>
          </div>
          <div className={`${!show ? "hide" : "display"}`}>
            {discount.promoCode}</div>
        </div>
      </div>}</>

  )
}

export default DiscountPage