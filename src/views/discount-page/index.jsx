import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Button } from "react-bootstrap"
import StarRatings from "react-star-ratings"
import * as axios from "axios"
import FetchError from "../../components/fetch-error"
import "./styles.css"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const DiscountPage = () => {
  const [discount, setDiscount] = useState(null)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const fetchData = async () => {
    setLoading(true)
    try {
      await axios
        .get(`${baseUrl}/api/discounts/${id}`)
        .then((response) => setDiscount(response.data))
      setLoading(false)
    } catch (e) {
      throw new Error(e.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log(discount)
  return (
    <>
      {loading ? <div>Loading</div> : ""}
      {discount ? (
        <div className='discount-container'>
          <div className='col'>
            <div className='img-container'>img</div>
          </div>
          <div className='col'>
            <h3>Discount Name:{discount.name}</h3>
            <h4>
              Company:
              {discount.companies && <span>{discount.companies[0].name}</span>}
            </h4>
            <h4>Tags:{discount.tags.map((tag) => ` ${tag.name};`)}</h4>
            <h4>Location:</h4>
            <h4>Expired to:{discount.periodEnd}</h4>
            <h4>Description:</h4>
            <p>{discount.description}</p>
            <div className='rates'>
              <StarRatings starDimension='27px' starSpacing='5px' />
            </div>
            <div className='action'>
              <Button onClick={() => setShow(!show)} variant='primary'>
                Order
              </Button>
              <Button variant='dark'>Feedbacks</Button>
            </div>
            <div className={`${!show ? "hide" : "display"}`}>
              {discount.promoCode}
            </div>
          </div>
        </div>
      ) : (
        <FetchError />
      )}
    </>
  )
}

export default DiscountPage
