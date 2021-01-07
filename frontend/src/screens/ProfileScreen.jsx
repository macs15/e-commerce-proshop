/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react"
import { Button, Form, Col, Row, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { listMyOrders } from "../actions/orderActions"
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

  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else if (!user.name) {
      dispatch(getUserDetails("profile"))
      dispatch(listMyOrders())
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
        {loadingOrders && <Loader />}
        {errorOrders && <Message variant="error">{errorOrders}</Message>}
        {!loadingOrders && orders && (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td className="text-center">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td className="text-center">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="dark">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
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
