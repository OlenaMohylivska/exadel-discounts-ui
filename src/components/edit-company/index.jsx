import React, { useEffect, useState } from "react"
import axios from "axios"
import AddCompany from "components/add-company"
import { useParams } from "react-router-dom"

const EditCompany = () => {
  const [company, setCompany] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    axios
      .get(`https://sandbox-team5.herokuapp.com/api/company/${id}`)
      .then((res) => {
        setCompany(res.data)
      })
  }, [])

  return (
    <div className="container">
      {company && (
        <AddCompany isEdit={true} company={company} setCompany={setCompany} />
      )}
    </div>
  )
}

export default EditCompany
