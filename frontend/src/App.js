import React from "react"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"

const App = () => (
  <Router>
    <Header />
    <main className="py-3">
      <Container fluid="xl">
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/shipping" component={ShippingScreen} />
        <Route exact path="/payment" component={PaymentScreen} />
        <Route exact path="/placeorder" component={PlaceOrderScreen} />
      </Container>
    </main>
    <Footer />
  </Router>
)

export default App
