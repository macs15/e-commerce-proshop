import React, { useEffect, useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import FormContainer from "../components/FormContainer"
import { login } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
// import Message from "../components/Message"

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, userInfo, error } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, redirect, history])

  const submitHandler = e => {
    e.preventDefault()

    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
          ></Form.Control>
        </Form.Group>

        <Row className="py-2">
          <Col xs="12">
            {loading && <Loader mini />}
            {error && <Message variant="danger">{error}</Message>}
          </Col>
        </Row>

        <Row className="flex justify-content-center">
          <Button
            type="submit"
            variant="primary"
            disabled={loading || email.length === 0 || password.length === 0}
          >
            Sign In
          </Button>
        </Row>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

LoginScreen.defaultProps = {
  location: undefined,
  history: undefined
}

LoginScreen.propTypes = {
  location: PropTypes.shape(),
  history: PropTypes.shape()
}
export default LoginScreen
