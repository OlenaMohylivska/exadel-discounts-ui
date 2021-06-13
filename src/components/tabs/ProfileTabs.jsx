import React from "react"
import './styles.css'

function ProfileTabs() {
  return (
    <div className="profile-tabs">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Profile
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Favorite
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            History
          </a>
        </li>
      </ul>
    </div>
  )
}

export default ProfileTabs
