import React, { useState, useEffect, useContext } from "react"
import "./styles.scss"
import axiosInstance from "components/api"
import { useHistory } from "react-router-dom"
import moment from "moment"
// import QRCode from "qrcode.react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PdfDocument from "views/pdf-promocode"
import PreviewGoogleMap from "components/preview-google-map/preview-google-map"
import { Context } from "store/context"
// import { Base64 } from "js-base64"

// const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const OrderConfirm = () => {
  const [QrCode, setQrCode] = useState([])
  const [promocodeFetchError, setPromocodeFetchError] = useState([])
  const [expirationDate, setExpirationDate] = useState("")
  const [discountName, setDiscountName] = useState("")
  const [discountLocations, setDiscountLocations] = useState(null)
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  const { bindToken } = useContext(Context)
  const discountId = history.location.pathname.split("/").pop()

  const fullAddressLocations =
    discountLocations &&
    discountLocations
      .map((country) => {
        return country.cities.map((city) => {
          return city.addresses.map((el) => {
            return el.address
              ? `${country.name} ${city.name} ${el.address}`
              : el.addresses.map((el) => `${country.name} ${el.address}`)
          })
        })
      })
      .flat(3)

  const fetchData = async (url) => {
    try {
      await axiosInstance.get(url).then((response) => {
        setExpirationDate(response.data.promoCodePeriodEnd)
        setDiscountName(response.data.discount.name)
        setDiscountLocations(response.data.discount.company.countries)
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

  // const blob = new Blob([QrCode], { type: "image/png" })
  // const url = URL.createObjectURL(blob)

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
            `Expiration date: ${moment(expirationDate).format(
              "MMM Do YYYY"
            )}`}{" "}
        </p>
        <p>Addresses:</p>
        {fullAddressLocations &&
          fullAddressLocations.map((address, index) => (
            <div key={index}>{address}</div>
          ))}
      </div>
      <div className="p-2">
        {fullAddressLocations && (
          <PreviewGoogleMap allAddresses={fullAddressLocations} />
        )}
      </div>
    </div>
  )
}

export default OrderConfirm
