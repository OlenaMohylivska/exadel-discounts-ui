import React, { useState, useEffect, useRef } from "react"
import "./styles.scss"
import axiosInstance from "components/api"
import { useHistory } from "react-router-dom"
import moment from "moment"
import QRCode from "qrcode.react"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const OrderConfirm = () => {
  const linkRef = useRef()
  const promocodeImg = useRef()
  const [promocode, setPromocode] = useState(null)
  const [promocodeFetchError, setPromocodeFetchError] = useState([])
  const [expirationDate, setExpirationDate] = useState("")

  const history = useHistory()

  const discountId = history.location.pathname.split("/").pop()

  const fetchData = async (url) => {
    try {
      await axiosInstance.get(baseUrl + url).then((response) => {
        setPromocode(response.data.employeePromocode)
        setExpirationDate(response.data.promoCodePeriodEnd)
      })
    } catch (e) {
      setPromocodeFetchError(e.message)
    }
  }

  useEffect(() => {
    fetchData(`/api/orders/${discountId}`)
  }, [])

  return (
    <div className="order-wrapper">
      <h4 className="order-title">
        Great choice, hope you`ll enjoy it! Please, find your promocode QR code
        down below
      </h4>
      <div className="promocode-info">
        <div className="promocode">
          {promocode ? (
            <QRCode
              id="qrCodeEl"
              value={promocode}
              renderAs="svg"
              fgColor="#333"
              bgColor="#fff"
              src="/promocode"
              ref={promocodeImg}
            />
          ) : (
            <div className="fetch-error-info">
              Loading discount info - {promocodeFetchError}
            </div>
          )}
          {promocode && (
            <div>
              <a
                className="link-text"
                ref={linkRef}
                download='myPromocode.pdf'
                href="/promocode"
              >
                Download QR Code
              </a>
            </div>
          )}
        </div>

        <p>Expiration date: {moment(expirationDate).format("MMM Do YYYY")} </p>
        <p>Address: </p>
      </div>
    </div>
  )
}

export default OrderConfirm
