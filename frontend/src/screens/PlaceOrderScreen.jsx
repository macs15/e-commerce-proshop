/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react"
import { Col, Row, ListGroup, Image, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { createOrder } from "../actions/orderActions"
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const { cartItems, paymentMethod, shippingAddress } = useSelector(
    state => state.cart
  )
  const { address, city, postalCode, country } = shippingAddress

  // Calculate prices
  const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`order/${order._id}`)
    }
  }, [history, success, order])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      })
    )
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md="8">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {address}, {city}, {postalCode}, {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md="1">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md="4">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md="4">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

PlaceOrderScreen.propTypes = {
  history: PropTypes.shape().isRequired
}

export default PlaceOrderScreen
