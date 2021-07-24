import React, { useState, useEffect, useContext } from "react"
import ProductCard from "components/product-card"
import axiosInstance from "components/api"
import "./styles.scss"
import { Context } from "store/context"
import FetchError from "components/fetch-error"
import { Spinner, Button } from "react-bootstrap"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const HistoryPage = () => {
  const [discounts, setDiscounts] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [isButtonShown, setIsButtonShown] = useState(false)

  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])

  const paginationParams = {
    pageNum: pageNumber,
    itemsPerPage: 8
  }

  useEffect(() => {
    setLoading(true)
    axiosInstance.post(`${baseUrl}/api/orders`, paginationParams)
      .then(resp => {
        const extendedUserDiscounts = resp.data.content.map((el) => (
          { ...el, isFavourite: false }
        ))
        setDiscounts([...discounts, ...extendedUserDiscounts])
        extendedUserDiscounts.length < paginationParams.itemsPerPage && setIsButtonShown(false)
        setLoading(false)
      }).catch(err => setFetchError(err.message))

  }, [pageNumber])

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
          <div className="history-card-wrapper">
            {discounts.map((elem, index) => {
              return (
                <ProductCard elem={elem} key={index} isOrdered={true} />
              )
            })}
          </div>
          {isButtonShown && <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Load more
            </Button>
          </div>
          }
        </div>
      )}
    </>
  )
}

export default HistoryPage
