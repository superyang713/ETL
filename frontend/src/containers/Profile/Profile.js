import React, { Component } from "react";
import { API, Auth, Storage  } from "aws-amplify";
import { Image } from "react-bootstrap";

import banner from  "../../asset/banner.jpg";


Storage.configure({ level: 'private' });
class Profile extends Component {
  state = {
    isLoaded: false,
    user: {},
    image: "",
  }
  
  async componentDidMount() {
    try {
      const userInfo = await Auth.currentUserInfo();      
      const user = await this.getUser(userInfo.attributes.profile);

      this.setState({ user });
      this.setState({ isLoaded: true });

      const image = await this.getProfilePic(this.state.user.profilePic);
      this.setState({ image });
    } catch (e) {
      alert(e);
    }
  }

  getUser = profile => (
    API.get("ETL", `/profile/${profile}`)
  )

  getProfilePic = profilePic => (
    profilePic ? Storage.vault.get(profilePic) : banner
  )

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
