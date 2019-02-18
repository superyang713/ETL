import React from "react";
import { Auth } from "aws-amplify";
import { s3Upload } from "libs/awsLib";
import { createUser } from "libs/awsLib";
import withStyles from "@material-ui/core/styles/withStyles";

import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
import config from "config";


class Signup extends React.Component {
  constructor() {
    super();
    this.file = null;
  }
  
  state = {
    isLoading: false,
    newUser: null,
    cardAnimaton: "cardHidden",

    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    firstName: "",
    lastName: "",
    role: "",
    gender: "",
    address: "",
    city: "",
    state: "",
  };

  componentDidMount() {
    setTimeout(
      () => {
        this.setState({ cardAnimaton: "" });
      }, 700
    );
  }
  
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }


  handleChangeRole = event => {
    this.setState({ role: event.target.value });
  }
  
  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    try {
      console.log(this.state);
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: { profile: this.state.role}
      });
      this.setState({ newUser });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      const attachment = this.file ? await s3Upload(this.file) : null;
      console.log(this.state);
      await createUser({
        profilePic: attachment,
        email: this.state.email,
        role: this.state.role,
        gender: this.state.gender,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      });

      this.props.userHasAuthenticated(true);
      const userInfo = await Auth.currentUserInfo();
      this.props.history.push(`/profile/${userInfo.id}`);
      
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }
  renderConfirmationForm() {
    const classes = this.props.classes;
    return(
      <form className={classes.form} onSubmit={this.handleConfirmationSubmit}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>Confirmation Code</h4>
        </CardHeader>
        <CardBody>

          <CustomInput
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "tel",
              id: "confirmationCode",
              value: this.state.confirmationCode,
              onChange: this.handleChange,
           }}
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button type="submit" simple color="primary" size="lg">
            Submit
          </Button>
        </CardFooter>
      </form>
    );
  }
  
  renderForm() {
    const classes = this.props.classes;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>Sign Up</h4>
        </CardHeader>
        <CardBody>

          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <FormControl fullWidth component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup
                  aria-label="Role"
                  name="role"
                  className={classes.group}
                  value={this.state.role}
                  onChange={this.handleChangeRole}
                >
                  <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                  <FormControlLabel value="student" control={<Radio />} label="Student" />
                </RadioGroup>
              </FormControl>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <FormControl fullWidth component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  name="gender"
                  className={classes.group}
                  value={this.state.value}
                  onChange={this.handleChangeGender}
                >
                  <FormControlLabel value="F" control={<Radio />} label="Female" />
                  <FormControlLabel value="M" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </GridItem>
          </GridContainer>
          
          <CustomInput
            labelText="Email..."
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "email",
              id: "email",
              value: this.state.email,
              onChange: this.handleChange,
            }}
          />

          <CustomInput
            labelText="Password"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              id: "password",
              value: this.state.password,
              onChange: this.handleChange,
            }}
          />

          <CustomInput
            labelText="Confirm Password"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              id: "confirmPassword",
              value: this.state.confirmPassword,
              onChange: this.handleChange,
            }}
          />

          <CustomInput
            labelText="First Name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "firstName",
              id: "firstName",
              value: this.state.firstName,
              onChange: this.handleChange,
            }}
          />

          <CustomInput
            labelText="Last Name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "lastName",
              id: "lastName",
              value: this.state.lastName,
              onChange: this.handleChange,
            }}
          />

          <CustomInput
            labelText="Address"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "address",
              id: "address",
              value: this.state.address,
              onChange: this.handleChange,
            }}
          />

          <CustomInput
            labelText="City"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "city",
              id: "city",
              value: this.state.city,
              onChange: this.handleChange,
            }}
          />

          <CustomInput
            labelText="State"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "state",
              id: "state",
              value: this.state.state,
              onChange: this.handleChange,
            }}
          />

          <CustomInput
            labelText="Profile Picture"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "file",
              id: "file",
              onChange: this.handleFileChange,
            }}
          />

        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button type="submit" simple color="primary" size="lg">
            Submit
          </Button>
        </CardFooter>
      </form>
    );
  }

  render() {
    const classes = this.props.classes;
    return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                {
                  this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()
                }
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    );
  }
}


export default withStyles(loginPageStyle)(Signup);
    
