import React from "react"
import "./styles.scss"
import HistoryPage from "views/history-page"
import { Tab, Tabs } from "react-bootstrap"
import FavouritePage from "views/favourite-page"
import ProfileUserInfo from "views/profile-userInfo"
import { useHistory, useRouteMatch } from "react-router-dom"
import Companies from "components/companies"

function ProfileTabs() {
  const history = useHistory()
  const { path } = useRouteMatch()

  const handleUrlChange = (eventKey) => {
    history.push(`${path}/${eventKey}`)
  }

  return (
    <div className="profile-tabs">
      <Tabs
        defaultActiveKey="info"
        transition={false}
        onSelect={handleUrlChange}
      >
        <Tab eventKey="info" title="Profile">
          <ProfileUserInfo />
        </Tab>
        <Tab eventKey="favourite" title="Favourite">
          <FavouritePage />
        </Tab>
        <Tab eventKey="history" title="History">
          <HistoryPage />
        </Tab>
        <Tab eventKey="companies" title="Company">
          <Companies />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ProfileTabs
