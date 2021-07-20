import React, { useState, useEffect, useContext } from "react"
import { Container, Card, Button } from "react-bootstrap"
import PropTypes from "prop-types"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import "./styles.scss"
import axiosInstance from "components/api"
import { Context } from "store/context"

const CompanyInfo = ({ name, id }) => {
  const [logo, setLogo] = useState("")
  const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL
  const history = useHistory()
  const { path } = useRouteMatch()
  const { bindToken } = useContext(Context)
  useEffect(() => {
    bindToken()
  }, [])
  const updateItemHandler = () => {
    history.push(`${path}/edit-company/${id}`)
  }

  const fetchData = async (url, setFunc) => {
    await axiosInstance
      .get(baseUrl + url)
      .then((response) => setFunc(response.data))
  }
  const token = localStorage.getItem("jwt") && localStorage.getItem("jwt")
  useEffect(() => {
    axiosInstance.interceptors.request.use((config) => {
      token ? (config.headers.Authorization = token) : config
      return config
    })
  }, [])

  useEffect(() => {
    fetchData(`/api/images/${id}`, setLogo)
  }, [])

  return (
    <Container className="company-wrapper">
      <Card className="shadow product-card d-flex flex-column align-items-center card-size">
        <Link
          key={id}
          to={{
            pathname: `/edit-company/${id}`,
          }}
        >
          <Card.Title className="mb-3 card-title d-flex justify-content-center">
            {name}
          </Card.Title>
          <Card.Img
            variant="top"
            className="product-image mb-5 logo-style"
            src={logo ? logo : "https://zo.ua/uploads/no-logo.png"}
          />
        </Link>
        <Card.Body className="p-0 d-flex flex-column justify-content-between">
          <div className="product-footer">
            <Button variant="dark" onClick={updateItemHandler}>
              Update
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CompanyInfo

CompanyInfo.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
}
