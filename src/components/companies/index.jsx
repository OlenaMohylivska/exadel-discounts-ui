import AddCompany from "components/add-company"
import EditCompaniesAll from "components/edit-companies-all"
import React from "react"
import { Tab, Tabs } from "react-bootstrap"
// import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
// import Select from 'react-select'
// import PropTypes from "prop-types"
// import axios from "axios"
// import CustomModalWindow from "components/custom-modal-window"
// import "./styles.scss"
// import FileUploadPage from "components/upload-file"

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
