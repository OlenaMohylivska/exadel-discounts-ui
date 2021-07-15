import React, { useState, useEffect, useRef } from "react"
import "./styles.scss"
import axiosInstance from "components/api"
import { useHistory } from "react-router-dom"
import moment from "moment"
import QRCode from "qrcode.react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PdfDocument from "views/pdf-promocode"
import { Base64 } from "js-base64"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const OrderConfirm = () => {
  const [promocode, setPromocode] = useState(null)
  const [promocodeFetchError, setPromocodeFetchError] = useState([])
  const [expirationDate, setExpirationDate] = useState("")
  const [discountName, setDiscountName] = useState("")

  const history = useHistory()
  const promocodeRef = useRef()

  const discountId = history.location.pathname.split("/").pop()

  const fetchData = async (url) => {
    try {
      await axiosInstance.get(baseUrl + url).then((response) => {
        setPromocode(response.data.employeePromocode)
        setExpirationDate(response.data.promoCodePeriodEnd)
        setDiscountName(response.data.discount.name)
      })
    } catch (e) {
      setPromocodeFetchError(e.message)
    }
  }

  useEffect(() => {
    fetchData(`/api/orders/${discountId}`)
  }, [])

  const promocodeUrl = Base64.encode(promocode)

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
              value={promocode}
              renderAs="svg"
              size={128}
              level={"H"}
              fgColor="#333"
              bgColor="#fff"
              src="/promocode"
              ref={promocodeRef}
            />
          ) : (
            <div className="fetch-error-info">
              Loading discount info... {promocodeFetchError}
            </div>
          )}
          {promocode && (
            <div>
              <PDFDownloadLink
                document={
                  <PdfDocument
                    discountName={discountName}
                    expirationDate={expirationDate}
                    promocode={promocode}
                    setPromocode={setPromocode}
                    promocodeUrl={promocodeUrl}
                  />
                }
                fileName={`Promocode for ${discountName}.pdf`}
              >
                Download now!
              </PDFDownloadLink>
            </div>
          )}
        </div>

        <p>Expiration date: {moment(expirationDate).format("MMM Do YYYY")} </p>
        <p>Address: Ukraine, Lviv, Chornovola Str 25 (google map) </p>
      </div>
    </div>
  )
}

export default OrderConfirm
