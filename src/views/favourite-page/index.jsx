import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
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
  const [isFavorite, setIsFavorite] = useState([1])

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
  }, [isFavorite])

  return (
    <>
      {loading && (
        <div className="spin-container">
          <Spinner className="spin-loader" animation="border" variant="info" />
        </div>
      )}

      {fetchError && <FetchError error={fetchError} />}
      {discounts && discounts.length > 0 && !loading && (
        <div className="container">
          <div className="discounts-wrapper">
            {discounts.map((el) => {
              return (
                <ProductCard
                  elem={el}
                  key={el.id}
                  isFavorite={isFavorite}
                  setIsFavorite={setIsFavorite}
                />
              )
            })}
          </div>
          {!loading && discounts && discounts.length > 0 (
            <Pagination
              favorites={discounts}
              itemsPerFavoritePage={itemsPerFavoritePage}
              setItemsPerFavoritePage={setItemsPerFavoritePage}
              isFavorite={true}
            />
          )}
        </div>
      )}
      {discounts.length === 0 && (
        <div className="container d-flex flex-column align-items-center mt-2">
          <div>There is no favorite discounts.</div>
          <div>
            <Link to={"/"}>Add favorites.</Link>
          </div>
        </div>
      )}
    </>
  )
}

export default FavouritePage
