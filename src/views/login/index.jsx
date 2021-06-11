import React, { useState } from 'react'
import './styles.scss'
import { Form, Button, Container, Col } from 'react-bootstrap'
import { EyeFill } from 'react-bootstrap-icons'

function Login() {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setpasswordVisible] = useState(false)


    const onLoginChange = (event) => {
        setLogin(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onPasswordShow = () => {
        setpasswordVisible(!passwordVisible)
    }

    return (
        <Container>

            <div className="info">
                <div className="about-company-wrapper">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci exercitationem, explicabo ducimus perferendis eligendi, delectus aliquam unde magnam nam sed tempore quae dolorum hic ullam ut expedita quas tenetur nesciunt.</p>
                </div>

                <div className="statistics-wrapper">
                    {/* number in span should be changed to props*/}
                    <p>More than <span>200</span> people used our services</p>
                    <p>We cooperate with <span>90+</span> companies</p>
                    <p>We have <span>1768</span> special propositions for you right now</p>
                </div>

            </div>

            <Col className="form-wrapper" xl={5} lg={6} md={9} xs={10}>
                <Form >
                    <Form.Group className="form-item" controlId="formBasicEmail">
                        <Form.Label>Enter your login</Form.Label>
                        <Form.Control type="text" placeholder="Login"
                            value={login} onChange={event => onLoginChange(event)} />
                    </Form.Group>

                    <Form.Group className="form-item" controlId="formBasicPassword">
                        {/* icon "show password" should be changed when user clicks*/}
                        <Form.Label>Enter your password</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={event => onPasswordChange(event)} />
                            <EyeFill className="password-show-icon" onClick={onPasswordShow} />
                        </div>
                    </Form.Group>

                    <Form.Group className="form-item">
                        <Form.Text className="text-secondary">Your data is confidential</Form.Text>
                    </Form.Group>

                    <div className="d-flex justify-content-center" >
                        <Button className="w-75" variant="success" type="submit">
                            Log in
                    </Button>
                    </div>

                </Form>
            </Col>
        </Container>

    )
}

export default Login