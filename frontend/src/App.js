import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";

import Routes from "Routes";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import brand from "assets/img/logo.png";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true
  };

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch(e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
        <div className="App container">
          
          <Header
            color="transparent"
            brand={brand}
            fixed
            rightLinks={
              <HeaderLinks
                isAuthenticated={this.state.isAuthenticated}
                handleLogout={this.handleLogout}
              />}
            changeColorOnScroll={{
              height: 400,
              color: "white"
            }}
          />

          <Routes childProps={childProps} />
          
        </div>
    );
  }
}

export default withRouter(App);
