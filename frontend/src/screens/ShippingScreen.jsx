import React, { useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { saveShippingAddress } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country
  })

  const dispatch = useDispatch()

  const handleChange = e => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(saveShippingAddress(address))
    history.push("/payment")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Address"
            required
            value={address.address}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            name="postalCode"
            type="text"
            placeholder="Postal code"
            required
            value={address.postalCode}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Row className="flex justify-content-center">
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Row>
      </Form>
    </FormContainer>
  )
}

ShippingScreen.propTypes = {
  history: PropTypes.shape().isRequired
}

export default ShippingScreen
