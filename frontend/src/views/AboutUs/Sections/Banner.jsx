import React from "react";

import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import landingBg from "assets/img/landing-bg.jpg";


const Banner = props => (

  <Parallax filter image={landingBg}>
    <div className={props.classes.container}>
      <GridContainer justify="center" alignItems="center">
        <h1 className={props.classes.title}>About Us</h1>
      </GridContainer>
      <GridContainer justify="center" alignItems="center">
        <h5 className={props.classes.description}>
          We know how hard and expensive it can be to find
          native English speakers, and we are here to help.
        </h5>
      </GridContainer>
    </div>
  </Parallax>

);

export default Banner;
