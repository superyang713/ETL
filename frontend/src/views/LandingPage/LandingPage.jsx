import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Footer from "components/Footer/Footer.jsx";
import Banner from "./Sections/Banner.jsx";
import ProductSection from "./Sections/ProductSection.jsx";
import TeamSection from "./Sections/TeamSection.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";


class LandingPage extends Component {
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
    const classes = this.props.classes;
    return (
      <div>
        {this.props.isAuthenticated
         ? <Redirect to={this.state.profile_url}/>
         : <Fragment>
             <Banner classes={classes}/>        
             <div className={classNames(classes.main, classes.mainRaised)}>
               <div className={classes.container}>
                 <ProductSection />
                 <TeamSection />
               </div>
             </div>
             <Footer />
           </Fragment>
        }
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
