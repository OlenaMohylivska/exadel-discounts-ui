import React, { useEffect } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { useRouteMatch, useHistory } from "react-router-dom"

const Admin = () => {
  const adminTabs = [
    { eventKey: "all-promotions", title: "All promotions" },
    { eventKey: "all-companies", title: "All companies" },
    { eventKey: "add-item", title: "✚ Add promotion" },
    { eventKey: "add-company", title: "✚ Add company" },
    { eventKey: "statistics", title: "Statistics" },
    { eventKey: "tools", title: "Tools" },
  ]

  const { path } = useRouteMatch()
  const history = useHistory()
  const onTabSelected = (eventKey) => history.push(`${path}/${eventKey}`)

  useEffect(() => {
    history.push(`${path}/all-promotions`)
  }, [])

  useEffect(() => {
    if ( history.location.pathname === "/admin") {
      history.push(`${path}/all-promotions`)
    }
  }, [])

  return (
    <div className="container">
      <Tabs
        onSelect={onTabSelected}
        defaultActiveKey="all-promotions"
        transition={false}
      >
        {adminTabs.map((tab) => (
          <Tab eventKey={tab.eventKey} title={tab.title} key={tab.eventKey} />
        ))}
      </Tabs>
    </div>
  )
}

export default Admin
