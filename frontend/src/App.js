import React, { Component } from 'react';
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";

import './App.css';
import Header from "./components/Header/Header";
import Routes from "./Routes";


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
    this.props.history.push("/login");
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
          isAuthenticated={this.state.isAuthenticated}
          handleLogout={this.handleLogout}
        />
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
