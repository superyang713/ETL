import React, { Component } from "react";
import classNames from "classnames";
import { API } from "aws-amplify";
import withStyles from "@material-ui/core/styles/withStyles";
import { getCurrentUserInfo, getProfilePicFromS3 } from "../../libs/awsLib";

import Footer from "components/Footer/Footer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import DisplayMatch from "components/DisplayMatch/DisplayMatch.jsx";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import profilebg from "assets/img/profile-bg.jpg";
import LoadButton from "components/LoadButton/LoadButton";

class ProfilePage extends Component {
  state = {
    isLoaded: false,
    user: {},
    matched_user: {},
    userImage: "",
    matchImage: "",
    isLoading: false
  }

  async componentDidMount() {
    try {
      const user = await getCurrentUserInfo();
      this.setState({ user });
      this.setState({ isLoaded: true });
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
    } catch (e) {
      alert(e);
    }
  }

  render() {
    const classes = this.props.classes;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      this.state.isLoaded &&
      <div>
        <Parallax small filter image={profilebg} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>

              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={this.state.userImage} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>
                        {this.state.user.firstName} {this.state.user.lastName}
                      </h3>
                      <h6>{this.state.user.role}</h6>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>

              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <LoadButton handleSubmit={this.handleSubmit} isLoading={this.state.isLoading} />
                </GridItem>
              </GridContainer>

              <br /><br /><br />

              {this.state.matched_user &&
                <DisplayMatch
                  classes={classes}
                  matched_user={this.state.matched_user}
                  matchImage={this.state.matchImage}
                />
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(ProfilePage);
