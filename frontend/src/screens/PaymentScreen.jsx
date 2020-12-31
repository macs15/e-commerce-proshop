import React, { useState } from "react"
import { Button, Form, Col } from "react-bootstrap"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

PaymentScreen.propTypes = {
  history: PropTypes.shape().isRequired
}

export default PaymentScreen
