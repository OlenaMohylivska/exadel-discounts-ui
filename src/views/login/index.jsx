import React, { useState, useContext } from "react"
import "./styles.scss"
import { Form, Button, Container, Col } from "react-bootstrap"
import { EyeFill } from "react-bootstrap-icons"
import axiosInstance from "components/api"
import { Route, Redirect } from "react-router-dom"
import { Context } from "store/context"

function Login() {
  const [loginData, setLoginData] = useState({})
  const [passwordVisible, setpasswordVisible] = useState(false)
  const [error, setError] = useState(null)
  const { setIsAuthorized, isAuthorized } = useContext(Context)
  const [warning, setWarning] = useState(false)

  const handleChange = (e) => {
    const regExpWithoutSpace = /[\S]{0,}\s/
    const regExpCyrillic = /[а-яё]/g
    const inputString = e.target.value
    setError(false)

    if (regExpWithoutSpace.test(inputString)) {
      setWarning("You cannot use spaces")
    } else if (regExpCyrillic.test(inputString)) {
      setWarning("You enter Cyrillic. It is not recommended")
      setLoginData({ ...loginData, [e.target.name]: inputString })
    } else {
      setWarning(false)
      setLoginData({ ...loginData, [e.target.name]: inputString })
    }
  }
  const onPasswordShow = () => {
    setpasswordVisible(!passwordVisible)
  }
  const bindFunc = (token, role) => {
    axiosInstance.interceptors.request.use((config) => {
      token ? (config.headers.Authorization = token) : config
      return config
    })
    localStorage.setItem("username", loginData.username)
    localStorage.setItem("jwt", token)
    localStorage.setItem("role", role)
    setIsAuthorized(true)
  }

  const submit = async () => {
    try {
      await axiosInstance.post("/api/login", loginData).then((res) => {
        bindFunc(res.data.jwt, res.data.role[0].authority)
      })
    } catch (e) {
      setError(e.message)
    }
  }

  const handleEnter = async (e) => {
    if (e.keyCode === 13) {
      try {
        await axiosInstance
          .post("/api/login", loginData)
          .then((res) => bindFunc(res.data.jwt, res.data.role[0].authority))
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
                value={loginData.username}
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
                  value={loginData.password}
                  onKeyPress={() => handleEnter(event)}
                />
                <EyeFill
                  className="password-show-icon"
                  onClick={onPasswordShow}
                />
              </div>
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
            {error && (
              <div className="auth-error">
                Wrong login or password, please try again
                <div className="auth-error-message">({error})</div>
              </div>
            )}
            {warning && (
              <div className="auth-error">
                <div className="auth-error-message">({warning})</div>
              </div>
            )}
          </Form>
        </Col>
      </Container>
    </Route>
  )
}

export default Login
