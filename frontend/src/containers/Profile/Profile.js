import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { API } from "aws-amplify";

import LoaderButton from "../../components/LoaderButton/LoaderButton";
import DisplayMatch from "../../components/DisplayMatch/DisplayMatch";
import { getCurrentUserInfo, getProfilePicFromS3 } from "../../libs/awsLib.js";


class Profile extends Component {
  state = {
    isLoaded: false,
    isLoading: false,
    user: {},
    matched_user: {},
    userImage: "",
    matchImage: "",
  }
  
  async componentDidMount() {
    try {
      const user = await getCurrentUserInfo();
      this.setState({ user });
      this.setState({ isLoaded: true });
      const userImage = await getProfilePicFromS3(this.state.user.profilePic);
      this.setState({ userImage });
    } catch (e) {
      alert(e);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    
    try {
      const roleNeeded = this.state.user.role === "student" ? "teacher" : "student";
      const matched_user = await API.get("ETL", `/match/${roleNeeded}`);
      this.setState({ matched_user });
      const matchImage = await getProfilePicFromS3(this.state.matched_user.profilePic);
      this.setState({ matchImage });
      this.setState({ isLoading: false });
    } catch(e) {
      alert(e);
    }
  }


  render() {
    return (
      this.state.isLoaded &&
      <div>
        <Image src={this.state.userImage}/>
        <p>Hello, {this.state.user.lastName}</p>
        <p>Role: {this.state.user.role}</p>
        <form onSubmit={this.handleSubmit}>        
          <LoaderButton
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Match"
            loadingText="Looking for a Match..."
          />
        </form>
        {this.state.matched_user && <DisplayMatch user={this.state.matched_user} matchImage={this.state.matchImage}/> }
      </div>
    );
  }
}


export default Profile;
