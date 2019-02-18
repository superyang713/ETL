import React from "react";
import { Auth } from "aws-amplify";

import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";

import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import image from "assets/img/bg7.jpg";


class LoginPage extends React.Component {
  state = {
    redirect: false,
    cardAnimaton: "cardHidden",
    email: "",
    password: "",
    userInfo: {},
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
  
  handleSubmit = async event => {
    event.preventDefault();
    try {
      await Auth.signIn(
        this.state.email,
        this.state.password
      );
      this.props.userHasAuthenticated(true);
      const userInfo = await Auth.currentUserInfo();
      this.setState({ userInfo });
      this.props.history.push(`/profile/${userInfo.id}`);
    } catch (e) {
      alert(e.message);
    }
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
                  
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                    </CardHeader>
                    <CardBody>
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
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
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
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" simple color="primary" size="lg">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                  
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>

    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
