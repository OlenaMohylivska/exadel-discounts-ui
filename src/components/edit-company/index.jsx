import React, { useContext, useEffect, useState } from "react"
import axiosInstance from "components/api"
import AddCompany from "components/add-company"
import { useParams } from "react-router-dom"
import FetchError from "components/fetch-error"
import { Context } from "store/context"

const EditCompany = () => {
  const [company, setCompany] = useState(null)
  const { id } = useParams()
  const [fetchError, setFetchError] = useState(null)
  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])

  useEffect(() => {
    axiosInstance
      .get(`https://sandbox-team5.herokuapp.com/api/company/${id}`)
      .then((res) => {
        setCompany(res.data)
      })
      .catch((err) => setFetchError(err.message))
  }, [])

  return (
    <>
      {fetchError && <FetchError error={fetchError} />}
      {!fetchError && (
        <div className="container">
          {company && (
            <AddCompany
              isEdit={true}
              company={company}
              setCompany={setCompany}
            />
          )}
        </div>
      )}
    </>
  )
}

export default EditCompany
