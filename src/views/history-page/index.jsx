import React, { useState, useEffect } from 'react'
import LinearProductCard from 'components/linear-product-card'
import axios from 'axios'
import './styles.scss'

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const HistoryPage = () => {
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
      <div className="history-card-wrapper">
        {discounts.map(el => <LinearProductCard isFavouritePage={false} discount={el} discounts={discounts} setDiscounts={setDiscounts} key={el.id} />)}
      </div>
    </div>
  )
}

export default HistoryPage