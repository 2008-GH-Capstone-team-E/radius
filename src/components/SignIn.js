import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { auth } from "./firebase";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      user: auth().currentUser,
    };
    this.signIn = this.signIn.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      await this.signIn(this.state.email, this.state.password);
    } catch (err) {
      console.log(err.message);
      this.setState({ error: "Please register before login" });
    }
  }

  signIn(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
  }

  async signInWithGoogle() {
    try {
      const provider = await new auth.GoogleAuthProvider();
      const result = await auth().signInWithPopup(provider);
      return result;
    } catch (err) {
      // this.setState({ error: err.message });
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        {this.state.user ? <h1>{this.state.user.email}</h1> : ""}
        <Container style={{ marginTop: "30px" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              {this.state.error ? (
                <p className="text-danger">{this.state.error}</p>
              ) : null}
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={!this.state.email || !this.state.password}
            >
              Login
            </Button>
          </Form>
          <br />
          <h4>or</h4>
          <br />

          <Button
            variant="danger"
            type="submit"
            onClick={this.signInWithGoogle}
          >
            Login with Google
          </Button>
        </Container>
      </div>
    );
  }
}

export default Login;
