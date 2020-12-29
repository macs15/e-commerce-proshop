import React, { useEffect, useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import FormContainer from "../components/FormContainer"
import { register } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

const RegisterScreen = ({ history, location }) => {
  const [message, setMessage] = useState(null)
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, userInfo, error } = userRegister

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, redirect, history])

  const onInfoChangeHandler = e => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value
    })
  }

  const submitHandler = e => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = info

    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      return
    }

    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      setMessage("all fields are required")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      return
    }

    dispatch(register(name, email, password))
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            value={info.name}
            onChange={e => onInfoChangeHandler(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            value={info.email}
            onChange={e => onInfoChangeHandler(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={info.password}
            onChange={e => onInfoChangeHandler(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={info.confirmPassword}
            onChange={e => onInfoChangeHandler(e)}
          ></Form.Control>
        </Form.Group>

        <Row className="py-2">
          <Col xs="12">
            {loading && <Loader mini />}
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
          </Col>
        </Row>

        <Row className="flex justify-content-center">
          <Button
            type="submit"
            variant="primary"
            // disabled={loading || info.name.length === 0 || password.length === 0}
          >
            Sign In
          </Button>
        </Row>
      </Form>

      <Row className="py-3">
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

RegisterScreen.defaultProps = {
  location: undefined,
  history: undefined
}

RegisterScreen.propTypes = {
  location: PropTypes.shape(),
  history: PropTypes.shape()
}

export default RegisterScreen
