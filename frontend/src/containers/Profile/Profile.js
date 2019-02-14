import React, { Component } from "react";
import { API } from "aws-amplify";

import LoaderButton from "../../components/LoaderButton/LoaderButton";
import DisplayProfile from "../../components/DisplayProfile/DisplayProfile";
import { getCurrentUserInfo, getProfilePicFromS3 } from "../../libs/awsLib";


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
          <DisplayProfile
            user={this.state.user}
            matchImage={this.state.userImage}
          />
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
          {
            this.state.matched_user &&
              <DisplayProfile
                user={this.state.matched_user}
                matchImage={this.state.matchImage}/>
          }
        </div>
    );
  }
}

export default Profile;
