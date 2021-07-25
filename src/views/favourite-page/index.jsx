import React, { useState, useEffect, useContext } from "react"
import axiosInstance from "components/api"
import "./styles.scss"
import { Context } from "store/context"
import FetchError from "components/fetch-error"
import { Spinner } from "react-bootstrap"
import ProductCard from "components/product-card"
import Pagination from "components/pagination"

// const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const FavouritePage = () => {
  const [discounts, setDiscounts] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { bindToken } = useContext(Context)
  const [itemsPerFavoritePage, setItemsPerFavoritePage] = useState(9)
  const [isFavorite, setIsFavorite] = useState(true)
  useEffect(() => {
    bindToken()
  }, [])
  useEffect(() => {
    setLoading(true)
    axiosInstance
      .post(`/api/employee/favorites`, {})
      .then((response) => {
        setDiscounts(response.data.content)
        setLoading(false)
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  return (
    <>
      {loading && (
        <div className="spin-container">
          <Spinner className="spin-loader" animation="border" variant="info" />
        </div>
      )}
      {fetchError && <FetchError error={fetchError} />}
      {discounts && (
        <div className="container">
          <div className="discounts-wrapper">
            {discounts.map((el) => {
              return <ProductCard elem={el} key={el.id} isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
            })}
          </div>
          {!loading && (
            <Pagination
              favorites={discounts}
              itemsPerFavoritePage={itemsPerFavoritePage}
              setItemsPerFavoritePage={setItemsPerFavoritePage}
              isFavorite={true}
            />
          )}
        </div>
      )}
    </>
  )
}

export default FavouritePage
