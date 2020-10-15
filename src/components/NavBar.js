import React from "react"
import { Nav, Navbar } from "react-bootstrap";
import '../css/style.css'


export const Header = () => {
  return(
    <div className="header">
      <Navbar collapseOnSelect expand="lg" variant="dark">
     <Navbar.Brand>
        <a href="/">
        <img src="https://github.com/2008-GH-Capstone-team-E/radius/blob/main/public/logo.png?raw=true"  width="50" height="50"/>
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          <Nav.Link href="/login">Log In</Nav.Link>
          <Nav.Link eventKey={2} href="/signup">Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
