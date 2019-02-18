import React from "react";

import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import landingBg from "assets/img/landing-bg.jpg";


const Banner = props => (
  <Parallax filter image={landingBg}>
    <div className={props.classes.container}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <h1 className={props.classes.title}>ETL PROJECT</h1>
          <h4>
            Where English Teaching and Learning Are Met.
          </h4>
          <br />
          <Button
            color="danger"
            size="lg"
            href="https://www.youtube.com/watch?v=FkZOphAC8iI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-play" />
            Watch video
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  </Parallax>
);

export default Banner;
