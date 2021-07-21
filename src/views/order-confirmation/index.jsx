import React, { useState, useEffect, useContext } from "react"
import "./styles.scss"
import axiosInstance from "components/api"
import { useHistory } from "react-router-dom"
import moment from "moment"
// import QRCode from "qrcode.react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PdfDocument from "views/pdf-promocode"
// import PreviewGoogleMap from "components/preview-google-map/preview-google-map"
import { Context } from "store/context"
// import { Base64 } from "js-base64"

// const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const OrderConfirm = () => {
  const [QrCode, setQrCode] = useState([])
  const [promocodeFetchError, setPromocodeFetchError] = useState([])
  const [expirationDate, setExpirationDate] = useState("")
  const [discountName, setDiscountName] = useState("")
  const [loading, setLoading] = useState(true)
  const [addresses, setAddresses] = useState(null)

  const history = useHistory()

  const { bindToken } = useContext(Context)
  const discountId = history.location.pathname.split("/").pop()

  const fetchData = async (url) => {
    try {
      await axiosInstance.get(url).then((response) => {
        setExpirationDate(response.data.promoCodePeriodEnd)
        setDiscountName(response.data.discount.name)
        setDiscountLocations(response.data.discount)
      })
    } catch (e) {
      setPromocodeFetchError(e.message)
    }
  }

  useEffect(() => {
    fetchData(`/api/orders/${discountId}`)
  }, [])

  const fetchQrCode = async (url) => {
    try {
      await axiosInstance.post(url).then((response) => {
        setQrCode(response.data)
        setLoading(
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        )
      })
    } catch (e) {
      setPromocodeFetchError(e.message)
    }
  }

  useEffect(() => {
    fetchQrCode(`/api/orders/create/${discountId}`)
  }, [])

  useEffect(() => {
    bindToken()
  }, [])

  return (
    <div className="order-wrapper">
      <h4 className="order-title">
        Great choice, hope you`ll enjoy it! Please, find your promocode QR code
        down below
      </h4>
      <div className="promocode-info">
        <div className="promocode">
          {QrCode ? (
            <img alt="QR Code" src={QrCode} />
          ) : (
            <div className="fetch-error-info">
              Loading discount info... {promocodeFetchError}
            </div>
          )}

          {loading ? (
            <p>Loading info...</p>
          ) : (
            <PDFDownloadLink
              document={
                <PdfDocument
                  expirationDate={expirationDate}
                  discountName={discountName}
                  addresses={addresses}
                />
              }
              fileName={`Promocode for ${discountName}.pdf`}
            >
              Download now!
            </PDFDownloadLink>
          )}
        </div>

        <p>
          {expirationDate &&
            `Expiration date: ${moment(expirationDate).format("MMM Do YYYY")}`}
        </p>

        <p className="address-title">Addresses: </p>
        <div>{addresses && addresses}</div>
      </div>
    </div>
  )
}

export default OrderConfirm
