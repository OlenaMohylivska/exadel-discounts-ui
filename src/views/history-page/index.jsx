import React, { useState, useEffect, useContext } from 'react'
import LinearProductCard from 'components/linear-product-card'
import axios from 'axios'
import './styles.scss'
import { Context } from 'store/context'
import FetchError from 'components/fetch-error'

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const HistoryPage = () => {
  const [discounts, setDiscounts] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const images = useContext(Context)

  useEffect(() => {
    axios.get(`${baseUrl}/api/discounts`)
      .then(resp => {
        const allDiscounts = resp.data.map((el, index) => (
          { ...el, isFavourite: false, image: images[index] }
        ))
        setDiscounts(allDiscounts)
      }).catch(err => setFetchError(err.message))
  }, [])

  return (
    <>
      {fetchError ? <FetchError error={fetchError} /> :
        <div className="container">
          <div className="history-card-wrapper">
            {discounts.map(el => {
              return <LinearProductCard
                buttonText=""
                discount={el}
                discounts={discounts}
                setDiscounts={setDiscounts}
                key={el.id}
              />
            })}
          </div>
        </div>
      }
    </>
  )
}

export default HistoryPage