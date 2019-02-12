import React, { Component } from "react";
import { API, Storage  } from "aws-amplify";
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
      const user = await this.getUser();
      this.setState({ user: user[0] });
      this.setState({ isLoaded: true });
      
      const image = await this.getProfilePic(this.state.user.profilePic);
      this.setState({ image });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  getUser = () => (
    API.get("ETL", `/profile/${this.props.match.params.id}`)
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
