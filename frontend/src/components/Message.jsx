import React from "react"
import PropTypes from "prop-types"
import { Alert } from "react-bootstrap"

const Message = ({ variant, children }) => (
  <Alert variant={variant}>{children}</Alert>
)

Message.defaultProps = {
  variant: "info"
}

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Message
