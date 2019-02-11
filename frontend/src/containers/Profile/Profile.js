import React, { Component } from "react";
import { API, Storage  } from "aws-amplify";
import { Image } from "react-bootstrap";


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
    profilePic ? Storage.vault.get(profilePic) : "http://localhost:3000/static/media/banner.9a3b5267.jpg"
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
