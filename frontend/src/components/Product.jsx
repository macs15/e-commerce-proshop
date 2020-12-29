/* eslint-disable no-underscore-dangle */
import React from "react"
import PropTypes from "prop-types"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ product }) => (
  <Card className="my-3 p-3 rounded">
    <Link to={`/product/${product._id}`}>
      <Card.Img src={product.image} variant="top" />
    </Link>

    <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
      </Link>

      <Card.Text as="div">
        <div className="my-3">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
      </Card.Text>

      <Card.Text as="h3">${product.price}</Card.Text>
    </Card.Body>
  </Card>
)

Product.propTypes = {
  product: PropTypes.shape().isRequired
}

export default Product