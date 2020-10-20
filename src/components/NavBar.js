import React from "react"
import { Nav, Navbar } from "react-bootstrap";
import firebase, { auth, db } from "./firebase";
import '../css/style.css'



export const Header = () => {
  return(
    <div className="header">
      <Navbar collapseOnSelect expand="lg" variant="dark">
     <Navbar.Brand>
        <a href="/">
        <img src="https://github.com/2008-GH-Capstone-team-E/radius/blob/main/public/logo_radius.png?raw=true"/>
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          <Nav.Link href="/favorites">Favorites</Nav.Link>
          <Nav.Link href="/" onClick={async ()=> await firebase.auth().signOut()}>Sign Out</Nav.Link>
          <Nav.Link href="/login">Log In</Nav.Link>
          <Nav.Link eventKey={2} href="/signup">Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
