import React, { Component } from "react";
import { Auth, API } from "aws-amplify";
import {
  HelpBlock,
  FormGroup,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { s3Upload } from "../../libs/awsLib";

import "./Signup.css";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import config from "../../config";


class Signup extends Component {
  constructor() {
    super();
    this.file = null;
  }
  
  state = {
    isLoading: false,
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    newUser: null,
    category: "",
    gender: "",
    address: "",
    city: "",
    state: "",
  };

  validateForm = () => (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword &&
      this.state.address.length > 0 &&
      this.state.category.length > 0 &&
      this.state.gender.length > 0 &&
      this.state.city.length > 0 &&
      this.state.state.length > 0
  )

  validationConfirmationForm = () => (
     this.state.confirmationCode.length > 0
  )

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleCategoryGroupChange = event => {
    this.setState({ category: event });
  }

  handleGenderGroupChange = event => {
    this.setState({ gender: event });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({ newUser });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  }

  
  createUser(user) {
    return API.post("ETL", "/register", { body: user });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    try {
      const attachment = this.file ? await s3Upload(this.file) : null;
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      await this.createUser({
        profilePic: attachment,
        category: this.state.category,
        gender: this.state.gender,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
      });
      
      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
      
    } catch (e) {
      console.log(e);
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>

        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validationConfirmationForm}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying..."
        />
        
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ToggleButtonGroup
            type="radio"
            name="category"
            value={this.state.category}
            onChange={this.handleCategoryGroupChange}
          >
            <ToggleButton value="student">Student</ToggleButton>
            <ToggleButton value="teacher">Teacher</ToggleButton>
          </ToggleButtonGroup>
        
          <ToggleButtonGroup
            type="radio"
            name="gender"
            value={this.state.gender}
            onChange={this.handleGenderGroupChange}
          >
            <ToggleButton value="M">Male</ToggleButton>
            <ToggleButton value="F">Female</ToggleButton>
          </ToggleButtonGroup>
        
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
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>

        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>

        <FormGroup controlId="address" bsSize="large">
          <ControlLabel>Address</ControlLabel>
          <FormControl
            value={this.state.address}
            onChange={this.handleChange}
            type="address"
          />
        </FormGroup>
        
        <FormGroup controlId="city" bsSize="large">
          <ControlLabel>City</ControlLabel>
          <FormControl
            value={this.state.city}
            onChange={this.handleChange}
            type="city"
          />
        </FormGroup>

        <FormGroup controlId="state" bsSize="large">
          <ControlLabel>State</ControlLabel>
          <FormControl
            value={this.state.state}
            onChange={this.handleChange}
            type="state"
          />
        </FormGroup>
        
        <FormGroup controlId="file">
          <ControlLabel>Profile Picture</ControlLabel>
          <FormControl onChange={this.handleFileChange} type="file" />
        </FormGroup>

        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up..."
        />
        
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
         ? this.renderForm()
         : this.renderConfirmationForm()
        }
      </div>
    );
  }
}

export default Signup;
