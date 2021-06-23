import React, { useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import AddCompany from 'components/add-company'
import AddItem from 'components/add-item'

const Admin = () => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const onTabSelected = (eventKey) => history.push(`${path}/${eventKey}`)
  useEffect(() => {
    if (path === "/admin") {
      history.push(`${path}/add-company`)
    }
  }, [])
  return (
    <div className="container">
      <Tabs onSelect={onTabSelected} defaultActiveKey="add-company" transition={false}>
        <Tab eventKey="add-company" title="Add company" />
        <Tab eventKey="add-item" title="Add promotion" />
        <Tab eventKey="all-companies" title="All companies" />
        <Tab eventKey="statistic" title="Statistic" />
        <Tab eventKey="tools" title="Tools" />
      </Tabs>
      <Switch>
        <Route exact path={`${path}/add-company`} component={AddCompany} />
        <Route exact path={`${path}/add-item`} component={AddItem} />
      </Switch>
    </div>
  )
}

export default Admin
