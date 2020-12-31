import React from "react"
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

import PropTypes from "prop-types"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => (
  <Nav className="justify-content-center mb-4">
    <Nav.Item>
      {step1 ? (
        <LinkContainer to="/login">
          <Nav.Link>Sign in</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Sign in</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {step2 ? (
        <LinkContainer to="/shipping">
          <Nav.Link>Shipping</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Shipping</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {step3 ? (
        <LinkContainer to="/payment">
          <Nav.Link>Payment</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Payment</Nav.Link>
      )}
    </Nav.Item>

    <Nav.Item>
      {step4 ? (
        <LinkContainer to="/placeorder">
          <Nav.Link>Place order</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Place order</Nav.Link>
      )}
    </Nav.Item>
  </Nav>
)

CheckoutSteps.defaultProps = {
  step1: false,
  step2: false,
  step3: false,
  step4: false
}

CheckoutSteps.propTypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
  step4: PropTypes.bool
}
export default CheckoutSteps
