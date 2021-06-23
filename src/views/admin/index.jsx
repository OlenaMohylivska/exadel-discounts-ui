import React, { useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { useRouteMatch, useHistory } from 'react-router-dom'

const Admin = () => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const onTabSelected = (eventKey) => history.push(`${path}/${eventKey}`)
  useEffect(() => {
    if(path === "/admin") {
      history.push(`${path}/statistic`)
    }
  }, [])
  return (
    <div className="container">
      <Tabs onSelect={onTabSelected} defaultActiveKey="statistic" transition={false}>
        <Tab eventKey="statistic" title="Statistic" />
        <Tab eventKey="add-company" title="✚ Add company" />
        <Tab eventKey="add-item" title="✚ Add promotion" />
        <Tab eventKey="all-companies" title="All companies" />
        <Tab eventKey="tools" title="Tools" />
      </Tabs>
    </div>
  )
}

export default Admin
