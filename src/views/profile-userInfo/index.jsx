import React, { useState } from "react"
import "./styles.scss"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import Select from "react-select"

function ProfileUserInfo() {
  const [category, setCategory] = useState([])
  const [expirationDate, setExpirationDate] = useState([])

  const categoryOptions = [
    { value: "Food", label: "Food" },
    { value: "Sport", label: "Sport" },
    { value: "Education", label: "Education" },
  ]

  const handleChangeCategory = (e) => {
    setCategory(e)
  }
  const handleExpirationFilter = (e) => {
    setExpirationDate(e.target.value)
  }

  return (
    <div className="profile">
      <div className="profile-info">
        <h4 className="profile-title">Personal Info</h4>
        <img
          src="https://i.pinimg.com/originals/17/56/8f/17568fcd478e0699067ca7b9a34c702f.png"
          alt="user-image"
        />

        <div>First name: John</div>
        <div>Last name: Brown </div>
        <div className="location">
          Location:
          <div className="location-country">country: Ukraine</div>
          <div>city: Lviv </div>
        </div>
      </div>
      <div className="user-subscriptions">
        <h4 className="subscriptions-title">Manage my subscriptions</h4>
        <h5>Choose by category</h5>
        <Select
          className="subscription-category"
          theme="primary75"
          options={categoryOptions}
          onChange={(e) => handleChangeCategory(e)}
          value={category}
          placeholder="Select..."
        />
        <h5>Choose by expiration date</h5>
        <InputGroup>
          <FormControl
            type="date"
            name="periodEnd"
            value={expirationDate ? expirationDate : ""}
            onChange={handleExpirationFilter}
          />
        </InputGroup>
        <div className="subsription-buttons">
          <Button className="subscriptions-btn">Sort by criteria</Button>
          <Button className="subscriptions-btn">View all</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileUserInfo
