import React, { useState, useEffect, useContext } from "react"
import "./styles.scss"
import axiosInstance from "components/api"
import { useHistory } from "react-router-dom"
import moment from "moment"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PdfDocument from "views/pdf-promocode"
import PreviewGoogleMap from "components/preview-google-map/preview-google-map"
import { Context } from "store/context"

// const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const OrderConfirm = () => {
  const [QrCode, setQrCode] = useState([])
  const [promocodeFetchError, setPromocodeFetchError] = useState([])
  const [expirationDate, setExpirationDate] = useState("")
  const [discountName, setDiscountName] = useState("")
  const [loading, setLoading] = useState(true)
  const [discountLocations, setDiscountLocations] = useState(null)

  const history = useHistory()

  const { bindToken } = useContext(Context)
  const discountId = history.location.pathname.split("/").pop()
  useEffect(() => {
    bindToken()
  }, [])

  const addresssMapper = (el) => {
    return `${el.address} ${el.city.name} ${el.city.country.name}`
  }
  const discountAddresses =
    discountLocations && discountLocations.addresses.map(addresssMapper)
  const discountCompanyAddresses =
    discountLocations && discountLocations.company.addresses.map(addresssMapper)
  const fullAddressLocations =
    discountLocations && discountAddresses.length
      ? discountAddresses
      : discountCompanyAddresses

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
    fetchData(`/api/discounts/${discountId}`)
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

  return (
    <div className="order-wrapper">
      <h4 className="order-title">
        Great choice, hope you`ll enjoy it! Please, find your promocode QR code
        down below
      </h4>
      <div className="promocode-info">
        <div className="promocode">
          {QrCode ? (
            <img src={QrCode} />
          ) : (
            <div className="fetch-error-info">
              Loading discount info... {promocodeFetchError}
            </div>
          )}

          {loading ? (
            <p className>Loading info...</p>
          ) : (
            <PDFDownloadLink
              document={
                <PdfDocument
                  expirationDate={expirationDate}
                  discountName={discountName}
                  fullAddressLocations={fullAddressLocations}
                  QrCode={QrCode}
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

// src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAACQElEQVR4Xu2YQW6DQAxFHbGYJUeYm4SLIYGUi8FN5ggsWSDc/+22YmibLVaFF4SZvEjYsb/NiL63Sc47J7sBtxtwuwG3/wQILKddGpVu6fP60I1bQyggqW7cfqk8WyxnLFWXYMAkfdZ5EdG9fSm9yPIICegicGVpijyxjAmsjLJOf3txNcB8YKizdKoFrphTsQCvrBnb35ffSu9awCxN7Zjtjq58WRzAsnSVFlHmswNF5KtQBwCSL5ahQE17MTTtzOFAgHJbpB0Fat/wu/GUDwEAevGlTFwzaXW2n8YBVnZLCpUgFbRAqDZZnwcvIgCo90b52IXNXbA7QBKOCRMAWDsd4YAgFXBRSn5BjgyhAC6YqhuzABd0UIFnsQAkbc+bl5V/xqw0iqlVJMAaObO0IAu2THkqCD8tDmABtlDj2RtIPqmj2kcAMHIgH1heFnSUF6a6LhiglHdrSdB4TEjUqFRX1vWAv1p0akUvnN+VHZ5fxQGSTe3UUBPSRCE9l//1wE4N5WhsfZNLDqHBgMnyQTFwfgppXydtBEA8HxBl1Jh436RQxQI4IUE54QCS1t/ZLCkiASZPK5WJK6rBRn+CASx6uDK47gvjXc9RAQAz7tgY4vlqJzKRAD4zTzf4ydGYlSVVZQUATJ54ToTmiaVN7fEAnsMkAj58TPTmGOowgPAwi8pU0EbHXA2cYQA4gOY+24sl7n6G+mqA+ZD4/gNXEHSMSVkqLwIA/PsdsDGOfZOzSCzgjd2A2w243YDbDbhNHxwYHFHbCA3eAAAAAElFTkSuQmCC`}
