import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Footer from "components/Footer/Footer.jsx";
import Banner from "views/AboutUs/Sections/Banner.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";


class AboutUs extends Component {
  render() {
    const classes = this.props.classes;
    return(
      <div>
        <Banner classes={classes}/>
        <Footer/>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(AboutUs);
