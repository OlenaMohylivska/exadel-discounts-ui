import React, { useEffect } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { useRouteMatch, useHistory } from "react-router-dom"

const Admin = () => {
  const adminTabs = [
    { eventKey: "statistics", title: "Statistics" },
    { eventKey: "add-company", title: "✚ Add company" },
    { eventKey: "add-item", title: "✚ Add promotion" },
    { eventKey: "all-companies", title: "All companies" },
    { eventKey: "tools", title: "Tools" },
  ]

  const { path } = useRouteMatch()
  const history = useHistory()
  const onTabSelected = (eventKey) => history.push(`${path}/${eventKey}`)

  useEffect(() => {
    if (history.location.pathname === "/admin") {
      history.push(`${path}/statistics`)
    }
  }, [])

  return (
    <div className="container">
      <Tabs
        onSelect={onTabSelected}
        defaultActiveKey="statistics"
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
