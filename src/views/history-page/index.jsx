import React, { useState, useEffect, useContext } from "react"
import LinearProductCard from "components/linear-product-card"
import axiosInstance from "components/api"
import "./styles.scss"
import { Context } from "store/context"
import FetchError from "components/fetch-error"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const HistoryPage = () => {
  const [discounts, setDiscounts] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const images = useContext(Context)
  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])

  useEffect(() => {
    axiosInstance
      .get(`${baseUrl}/api/orders`)
      .then((resp) => {
        const userDiscounts = resp.data.filter(
          (el) => el.employee.login === localStorage.getItem("username")
        )
        const extendedUserDiscounts = userDiscounts.map((el, index) => ({
          ...el,
          isFavourite: false,
          image: images.productImages[index],
        }))
        setDiscounts(extendedUserDiscounts)
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError && (
        <div className="container">
          <div className="history-card-wrapper">
            {discounts.map((el) => {
              return (
                <LinearProductCard
                  buttonText=""
                  discount={el}
                  discounts={discounts}
                  setDiscounts={setDiscounts}
                  key={el.id}
                />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default HistoryPage
