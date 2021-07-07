import React, { useState, useEffect, useContext } from "react"
import { Container, Form } from "react-bootstrap"
import Loupe from "components/icons/Loupe"
import * as axios from "axios"
import { Context } from "store/context"
import "./styles.scss"
import PromotionInfo from "components/promotionInfo"

const Promotions = () => {
  const cardImages = useContext(Context)
  const [discounts, setDiscounts] = useState([])
  const [discountsFetchError, setDiscountsFetchError] = useState(null)

  const fetchData = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_BACKEND_URL + "/api/discounts")
      .then((response) =>
        setDiscounts(() =>
          response.data.map((el, index) => ({
            ...el,
            img: cardImages[index]
          }))
        )
      )
      .catch((e) => setDiscountsFetchError(e.message))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container className="catalog-wrapper">
      <div className=" filter-panel column ">
        <div className="width-100">
          <div className="search">
            <label className="col-lg-5 col-md-8 col-sm-12 search-container position-relative">
              <div className="search-icon position-absolute end-0">
                <Loupe />
              </div>
              <Form className="search-input ">
                <Form.Group controlId="control-input">
                  <Form.Control type="text" placeholder="Enter your search" />
                </Form.Group>
              </Form>
            </label>
          </div>
        </div>
      </div>
      {discounts ? (
        <div className="discounts-wrapper">
          {discounts.map((elem) => {
            return (
              <PromotionInfo elem={elem} key={elem.id} />
            )
          })}
        </div>
      ) : (
        <div className="fetch-error-info">
          Sorry no info, {discountsFetchError ? discountsFetchError : ""}
        </div>
      )}
    </Container>
  )
}

export default Promotions

// CompanyInfo.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.number,
// }
