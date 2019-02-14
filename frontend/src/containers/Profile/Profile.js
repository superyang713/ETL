import React, { Component } from "react";
import { Image } from "react-bootstrap";

import { getCurrentUserInfo, getProfilePicFromS3 } from "../../libs/awsLib.js";


class Profile extends Component {
  state = {
    isLoaded: false,
    user: {},
    image: "",
  }
  
  async componentDidMount() {
    try {
      const user = await getCurrentUserInfo();
      this.setState({ user });
      this.setState({ isLoaded: true });

      const image = await getProfilePicFromS3(this.state.user.profilePic);
      this.setState({ image });
    } catch (e) {
      alert(e);
    }
  }

  randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  render() {
    return (
      this.state.isLoaded &&
      <div>
        <Image src={this.state.image}/>
        <p>Hello, {this.state.user.lastName}</p>
      </div>
    );
  }
}


export default Profile;
