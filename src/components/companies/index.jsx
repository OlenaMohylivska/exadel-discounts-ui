import AddCompany from "components/add-company"
import EditCompaniesAll from "components/edit-companies-all"
import React from "react"
import { Tab, Tabs } from "react-bootstrap"

const Companies = () => {
  return (
    <div className="profile-tabs">
      <Tabs defaultActiveKey="company-list" transition={false}>
        <Tab eventKey="company-list" title="Update current company">
          <EditCompaniesAll />
        </Tab>
        <Tab eventKey="add-company" title="Add company">
          <AddCompany />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Companies
