import React, { useState } from "react"
import AddItem from "components/add-item"
import AddCompany from "components/add-company"

const Admin = () => {
  const [display, setDisplay] = useState(false)

  return (
    <>
      <AddCompany display={display} setDisplay={setDisplay} />
      {display ? <AddItem /> : ""}
    </>
  )
}

export default Admin
