import React, { useState } from "react"
import "./styles.scss"
import { Button } from "react-bootstrap"
import Select from "react-select"
import ToastElement from "components/toast"

function ProfileUserInfo() {
  const [category, setCategory] = useState([])
  const [successMessage, setSuccessMessage] = useState(false)

  const categoryOptions = [
    { value: "Food", label: "Food" },
    { value: "Sport", label: "Sport" },
    { value: "Education", label: "Education" },
  ]

  const handleChangeCategory = (e) => {
    setCategory(e)
  }

  const subscriptionClickHandler = () => {
    setSuccessMessage(true)
  }


  return (
    <div className="profile">
      <div className="profile-info">
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
      </div>
      <div className="user-subscriptions">
        <h4 className="subscriptions-title">Manage my subscriptions</h4>
        <h5 className="subscriptions-title">Choose by category</h5>
        <Select
          className="subscription-category"
          theme="primary75"
          options={categoryOptions}
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
        {successMessage && <ToastElement className="toast-subs-position" />}
      </div>
    </div>
  )
}

export default ProfileUserInfo
