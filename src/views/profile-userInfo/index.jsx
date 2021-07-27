import React, { useState, useEffect, useContext } from "react"
import "./styles.scss"
import { Button, Col } from "react-bootstrap"
import Select from "react-select"
import ToastElement from "components/toast"
import axiosInstance from "components/api"
import FetchError from "components/fetch-error"
import { Context } from "store/context"
import userProfileImg from "../../assets/userProfileImg.png"

function ProfileUserInfo() {
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [successMessage, setSuccessMessage] = useState(false)
  const [fetchError, setFetchError] = useState(null)
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState(null)

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

  useEffect(() => {})

  const categoriesOptions =
    categories.length > 0 &&
    categories.map((category) => ({
      ...category,
      label: category.name,
      value: category.name,
    }))

  const handleChangeCategory = (e) => {
    setSelectedCategories(e)
  }

  const subscriptionClickHandler = () => {
    axiosInstance.put(
      `/api/employee/subscriptions/add`,
      selectedCategories.map((category) => category.id)
    )
    setSuccessMessage(true)
  }

  const deleteSubscriptionHandler = (e) => {
    setCategoryToBeDeleted(e)
  }

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError && (
        <div className="profile">
          <Col lg={5} className="profile-info">
            <h4 className="personal-info-title">Personal Info</h4>
            <div className="personal-info">
              <img
                className="profile-img"
                src={userProfileImg}
                alt="user-image"
              />
              <div className="user-details">
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
              </div>
            </div>
          </Col>
          <Col lg={4} className="user-subscriptions">
            <h4 className="subscriptions-title">Manage my subscriptions</h4>
            <h5 className="category-title">Choose by category</h5>
            {categoriesOptions && (
              <>
                <Select
                  className="subscription-category"
                  theme="primary75"
                  options={categoriesOptions}
                  onChange={(e) => handleChangeCategory(e)}
                  value={selectedCategories}
                  placeholder="Select..."
                  isMulti
                />
                <Button
                  className="subscriptions-btn"
                  onClick={subscriptionClickHandler}
                >
                  Subscribe to updates
                </Button>
              </>
            )}
            <h5 className="category-title">
              Delete previous subscriptions (if any)
            </h5>
            <Select
              className="subscription-category"
              theme="primary75"
              options={selectedCategories}
              onChange={(e) => handleChangeCategory(e)}
              value={categoryToBeDeleted}
              placeholder="Select..."
              isMulti
            />
            <Button
              className="subscriptions-btn"
              variant="danger"
              onClick={deleteSubscriptionHandler}
            >
              Delete subscriptions
            </Button>
            {successMessage && (
              <ToastElement
                className="toast-subs-position"
                setSuccessMessage={setSuccessMessage}
              />
            )}
          </Col>
        </div>
      )}
    </>
  )
}

export default ProfileUserInfo
