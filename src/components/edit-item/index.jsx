/*TODO: add dates to state, add styles, fix put-request, fix warnings in console*/
/*eslint-disable */
import React, { useState, useEffect } from 'react'
import './styles.scss'
import * as axios from 'axios'
import { useParams } from 'react-router-dom'
import AddItem from 'components/add-item'

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

const EditItem = () => {
  const {discountId} = useParams()
  const [discount, setDiscount] = useState({})

  const fetchDiscount = async () => {
    await axios
      .get(baseUrl + `/api/discounts/${discountId}`)
      .then((response) => {
        setDiscount(response.data)
      })
  }

  useEffect(() => {
    fetchDiscount()
  }, [])

  return (
    <>
      <AddItem isEditable={true}/>
    </>
  )
}

export default EditItem