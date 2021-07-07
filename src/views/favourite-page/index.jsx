import React, { useState, useEffect, useContext } from "react"
import LinearProductCard from "components/linear-product-card"
import { axiosInstance } from "components/api"
import "./styles.scss"
import { Context } from "store/context"
import FetchError from "components/fetch-error"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const FavouritePage = () => {
  const [discounts, setDiscounts] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const images = useContext(Context)

  useEffect(() => {
    axiosInstance.get(`${baseUrl}/api/discounts`)
      .then(resp => {
        const allDiscounts = resp.data.map((el, index) => (
          { ...el, isFavourite: true, image: images[index] }
        ))
        setDiscounts(allDiscounts)
      }).catch(err => setFetchError(err.message))
  }, [])

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError && <div className="container">
        <div className="favourite-card-wrapper">
          {discounts.map(el => {
            return <LinearProductCard
              buttonText="Order"
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

export default FavouritePage
