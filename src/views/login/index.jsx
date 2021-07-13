import React, { useState, useContext } from "react"
import "./styles.scss"
import { Form, Button, Container, Col } from "react-bootstrap"
import { EyeFill } from "react-bootstrap-icons"
import axiosInstance from "components/api"
import { Route, Redirect } from "react-router-dom"
import { Context } from "store/context"

// const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

function Login() {
  const [loginData, setLoginData] = useState({})
  const [passwordVisible, setpasswordVisible] = useState(false)
  const [error, setError] = useState(null)
  const { setIsAuthorized, isAuthorized } = useContext(Context)

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const onPasswordShow = () => {
    setpasswordVisible(!passwordVisible)
  }
  const bindFunc = (token) => {
    axiosInstance.interceptors.request.use((config) => {
      token ? (config.headers.Authorization = token) : config
      return config
    })
    localStorage.setItem("jwt", token)
    setIsAuthorized(true)
  }

  const submit = async () => {
    try {
      await axiosInstance
        .post("/api/login", loginData)
        .then((res) => bindFunc(res.data.jwt))
    } catch (e) {
      setError(e.message)
    }
  }

  const handleEnter = async (e) => {
    if (e.keyCode === 13) {
      try {
        await axiosInstance
          .post("/api/login", loginData)
          .then((res) => bindFunc(res.data.jwt))
      } catch (e) {
        setError(e.message)
      }
    }
  }

  return (
    <Route path="/login">
      {isAuthorized && <Redirect to="/" />}
      <Container>
        <Col className="form-wrapper" xl={5} lg={6} md={9} xs={10}>
          <Form>
            <Form.Group className="form-item" controlId="formBasicEmail">
              <Form.Label>Enter your login</Form.Label>
              <Form.Control
                type="text"
                placeholder="Login"
                name="username"
                onChange={(event) => handleChange(event)}
              />
            </Form.Group>
            <Form.Group className="form-item" controlId="formBasicPassword">
              <Form.Label>Enter your password</Form.Label>
              <div className="password-input">
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={(event) => handleChange(event)}
                  onKeyPress={() => handleEnter(event)}
                />
                <EyeFill
                  className="password-show-icon"
                  onClick={onPasswordShow}
                />
              </div>
              <Form.Text className="text-muted form-text">
                Must be 8-20 characters long.
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                className="btn-md px-5 mt-3"
                variant="dark"
                onClick={() => submit()}
              >
                Log in
              </Button>
            </div>
            {error && <div>{error}</div>}
          </Form>
        </Col>
      </Container>
    </Route>
  )
}

export default Login
