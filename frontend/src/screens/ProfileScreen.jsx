/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

const ProfileScreen = ({ history }) => {
  const [message, setMessage] = useState(null)
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, user, error } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else if (!user.name) {
      dispatch(getUserDetails("profile"))
    } else {
      setInfo({
        ...info,
        name: user.name,
        email: user.email
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, history, user, dispatch])

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

    if (name.trim().length === 0 || email.trim().length === 0) {
      setMessage("Name or email can't be blank")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      return
    }

    dispatch(
      updateUserProfile({
        id: user._id,
        name: info.name,
        email: info.email,
        password: info.password
      })
    )
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User profile</h2>
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
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat password"
              value={info.confirmPassword}
              onChange={e => onInfoChangeHandler(e)}
            ></Form.Control>
          </Form.Group>

          <Row className="py-2">
            <Col xs="12">
              {loading && <Loader mini />}
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Profile updated</Message>}
            </Col>
          </Row>

          <Row className="flex justify-content-center">
            <Button
              type="submit"
              variant="primary"
              disabled={
                loading || info.name.length === 0 || info.email.length === 0
              }
            >
              Update
            </Button>
          </Row>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  )
}

ProfileScreen.defaultProps = {
  history: undefined
}

ProfileScreen.propTypes = {
  history: PropTypes.shape()
}

export default ProfileScreen
