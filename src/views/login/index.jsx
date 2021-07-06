import React, { useState } from "react"
import "./styles.scss"
import { Form, Button, Container, Col } from "react-bootstrap"
import { EyeFill } from "react-bootstrap-icons"
import * as axios from "axios"

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL

function Login() {
  const [loginData, setLoginData] = useState({})
  const [passwordVisible, setpasswordVisible] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const onPasswordShow = () => {
    setpasswordVisible(!passwordVisible)
  }
  const submit = async () => {
    try {
      await axios
        .post(baseUrl + "/api/login", loginData)
        .then((res) => localStorage.setItem("jwt", res.data.jwt))
    } catch (e) {
      setError(e.message)
    }
  }

  //e00001 pass1
  return (
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

            <Form.Control
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={(event) => handleChange(event)}
            />
            <EyeFill className="password-show-icon" onClick={onPasswordShow} />
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
  )
}

export default Login
