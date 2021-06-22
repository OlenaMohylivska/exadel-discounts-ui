import React from "react"
import "./styles.scss"
import HistoryPage from "views/history-page"
import { Tab, Tabs } from "react-bootstrap"
import FavouritePage from "views/favourite-page"
import ProfileUserInfo from "views/profile-userInfo"
import Companies from "components/companies"

function ProfileTabs() {
  return (
    <div className="profile-tabs">
      <Tabs defaultActiveKey="profile" transition={false}>
        <Tab eventKey="profile" title="Profile">
          <ProfileUserInfo />
        </Tab>
        <Tab eventKey="favorite" title="Favorite">
          <FavouritePage />
        </Tab>
        <Tab eventKey="history" title="History">
          <HistoryPage />
        </Tab>
        <Tab eventKey="companies" title="Companies">
          <Companies />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ProfileTabs
