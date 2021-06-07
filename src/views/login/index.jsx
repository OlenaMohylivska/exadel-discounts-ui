import React from 'react'
import './styles.scss'
import { Form, Button, ButtonGroup, Container } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons';

function Login() {

    return (
        <Container>

            <div className="info">
                <ArrowRight />
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

            <div className="form-wrapper">
                <Form >
                    <Form.Group className="form-item" controlId="formBasicEmail">
                        <Form.Label>Enter your login</Form.Label>
                        <Form.Control type="text" placeholder="Login" />
                    </Form.Group>

                    <Form.Group className="form-item" controlId="formBasicPassword">
                        {/* add button "show password" maybe? */}
                        <Form.Label>Enter your password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="form-item">
                        <Form.Text className="text-secondary">Your data is confidential</Form.Text>
                    </Form.Group>

                    <ButtonGroup className="w-100">
                        <Button className="mx-4" variant="success" type="submit">
                            Log in
                        </Button>
                        <Button className="mx-4" variant="info" type="reset">
                            Reset
                        </Button>
                    </ButtonGroup>

                </Form>
            </div>
        </Container>

    )
}

export default Login