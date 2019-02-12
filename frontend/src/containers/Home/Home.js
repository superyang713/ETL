import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import Lander from "../../components/Lander/Lander";


class Home extends Component {
  state = {
    profile_url: "",
  }
  
  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const userInfo = await Auth.currentUserInfo();
      this.setState({ profile_url: `/profile/${userInfo.id}` });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? <Redirect to={this.state.profile_url}/> : <Lander />}
      </div>
    );
  }
}

export default Home;
