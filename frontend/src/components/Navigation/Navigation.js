import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { useNavigate } from "react-router-dom";

function Navigation() {
  const redirectToDashboard = () => {
    navigate('/');
  };

  const redirectToCheckout = () => {
    navigate('/checkout');
  };

  const redirectToProducts = () => {
    navigate('/products');
  };

  const navigate = useNavigate();

  return (
    <div>
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Master-Class</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  redirectToDashboard();
                }}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  redirectToProducts();
                }}
              >
                Products
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  redirectToCheckout();
                }}
              >
                Checkout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default Navigation;
