import React, { useState, useEffect } from 'react'
import LinearProductCard from 'components/linear-product-card'
import axios from 'axios'
import DiscountPage from 'views/discount-page'
import './styles.scss'
const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const FavouritePage = () => {
  const [discounts, setDiscounts] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/api/discounts`)
      .then(resp => {
        const allDiscounts = resp.data.map(el => (
          { ...el, isFavourite: false }
        ))
        setDiscounts(allDiscounts)
      })
  }, [])

  return (
    <div className="container">
      <div className="favourite-card-wrapper">
        {discounts.map(el => {
          return <LinearProductCard
            isFavouritePage={true}
            discount={el}
            discounts={discounts}
            setDiscounts={setDiscounts}
            key={el.id}
            onClick={() => <DiscountPage />}
          />})}
      </div>
    </div>
  )
}

export default FavouritePage