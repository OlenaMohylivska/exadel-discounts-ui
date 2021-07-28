import React, {useEffect} from "react"
import "./styles.scss"
import { Tab, Tabs } from "react-bootstrap"
import { useHistory, useRouteMatch } from "react-router-dom"

function ProfileTabs() {
  const history = useHistory()
  const { path } = useRouteMatch()

  const profileTabsList = [
    {eventKey: "info", title: "Profile"},
    {eventKey: "favourite", title: "Favourites"},
    {eventKey: "history", title: "History"}
  ]

  const handleUrlChange = (eventKey) => {
    history.push(`${path}/${eventKey}`)
  }

  useEffect(() => {
    if (history.location.pathname === "/profile") {
      history.push(`${path}/info`)
    }
  }, [])

  return (
    <div className="profile-tabs">
      <Tabs
        defaultActiveKey="info"
        transition={false}
        onSelect={handleUrlChange}
      >
        {profileTabsList.map(tab => (
          <Tab eventKey={tab.eventKey} title={tab.title} key={tab.eventKey} />
        ))}
      </Tabs>
    </div>
  )
}

export default ProfileTabs
