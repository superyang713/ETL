import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import LoaderButton from "../../components/LoaderButton/LoaderButton";
import "./Login.css";


class Login extends Component {
  state = {
    isLoading: false,
    email: "",
    password: ""
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    
    try {
      await Auth.signIn(
        this.state.email,
        this.state.password
      );
      
      this.props.userHasAuthenticated(true);
      const userInfo = await Auth.currentUserInfo();

      this.props.history.push(`/profile/${userInfo.id}`);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>

          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Loggin in..."
          >Login
          </LoaderButton>

          <Col className="signup" sm={10}>
            Not a member? <Link to="/signup">Sign Up Here</Link> 
          </Col>
          
        </form>
      </div>
    );
  }
}

export default Login;
