import React, { useState, useEffect, useContext } from "react"
import "./styles.scss"
import { Button, Col } from "react-bootstrap"
import Select from "react-select"
import ToastElement from "components/toast"
import axiosInstance from "components/api"
import FetchError from "components/fetch-error"
import { Context } from "store/context"

function ProfileUserInfo() {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState([])
  const [successMessage, setSuccessMessage] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  const { bindToken } = useContext(Context)

  useEffect(() => {
    bindToken()
  }, [])

  useEffect(() => {
    axiosInstance
      .get("/api/category")
      .then((res) => setCategories(res.data))
      .catch((err) => setFetchError(err.message))
  }, [])


  const categoriesOptions =
    categories.length > 0 &&
    categories.map((category) => ({
      ...category,
      label: category.name,
      value: category.name,
    }))

  const handleChangeCategory = (e) => {
    setCategory(e)
  }

  const subscriptionClickHandler = () => {
    setSuccessMessage(true)
  }

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError &&
        <div className="profile">
          <Col lg={5} className="profile-info">
            <h4 className="personal-info-title">Personal Info</h4>
            <img
              className="profile-img"
              src="https://i.pinimg.com/originals/17/56/8f/17568fcd478e0699067ca7b9a34c702f.png"
              alt="user-image"
            />

            <div>
              First name: <span className="filled-in">John</span>
            </div>
            <div>
              Last name: <span className="filled-in">Brown </span>
            </div>
            <div className="location">
              Location: <span className="filled-in">Lviv, </span>
              <span className="filled-in">Ukraine</span>
            </div>
          </Col>
          <Col lg={4} className="user-subscriptions">
            <h4 className="subscriptions-title">Manage my subscriptions</h4>
            <h5 className="subscriptions-title">Choose by category</h5>
            {categoriesOptions &&
              <>
                <Select
                  className="subscription-category"
                  theme="primary75"
                  options={categoriesOptions}
                  onChange={(e) => handleChangeCategory(e)}
                  value={category}
                  placeholder="Select..."
                  isMulti
                />
                <Button
                  className="subscriptions-btn"
                  onClick={subscriptionClickHandler}
                >
                  Subscribe to updates
                </Button>
              </>}
            {successMessage && <ToastElement className="toast-subs-position" setSuccessMessage={setSuccessMessage} />}
          </Col>
        </div>
      }
    </>
  )
}

export default ProfileUserInfo
