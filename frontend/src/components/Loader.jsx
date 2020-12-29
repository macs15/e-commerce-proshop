import React from "react"
import { Spinner } from "react-bootstrap"
import PropTypes from "prop-types"

const Loader = ({ mini }) => (
  <Spinner
    animation="border"
    role="status"
    style={{
      width: mini ? "50px" : "100px",
      height: mini ? "50px" : "100px",
      margin: mini ? "1rem auto" : "auto",
      display: "block"
    }}
  >
    <span className="sr-only">Loading...</span>
  </Spinner>
)

Loader.defaultProps = {
  mini: false
}

Loader.propTypes = {
  mini: PropTypes.bool
}

export default Loader
