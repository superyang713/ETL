import React, { Component } from "react";
import { API, Storage, S3Image } from "aws-amplify";

import config from "../../config";
import { s3Upload } from "../../libs/awsLib";


Storage.configure({ level: 'private' });
class Profile extends Component {
  state = {
    user: {},
  }
  
  async componentDidMount() {
    try {
      const user = await this.getUser();
      this.setState({ user: user[0] });

      console.log(this.state.user.profilePic);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  getUser = () => (
    API.get("ETL", `/profile/${this.props.match.params.id}`)
  )

  getProfilePic = profilePic => (
    Storage.vault.get(profilePic)
  )

  render() {
    return (
      <div>
        <p>Hello, {this.state.user.lastName}</p>
      </div>
    );
  }
}


export default Profile;
