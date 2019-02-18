import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import MoneyOff from "@material-ui/icons/MoneyOff";
import AccessTime from "@material-ui/icons/AccessTime";
import VerifiedUser from "@material-ui/icons/VerifiedUser";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";


const ProductSection = props => (
  <div className={props.classes.section}>
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={8}>
        <h2 className={props.classes.title}>What's this app</h2>
        <h5 className={props.classes.description}>
          ETL is a communication platform, aimed to find matches for students
          who want to practice English speaking and English native speakers
          who want to earn some extra money.
        </h5>
      </GridItem>
    </GridContainer>
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <InfoArea
            title="Cheap"
            description="Students pay significantly less as compared to traditional learning method, thanks to the elimination of middle agencies or educational institutes."
            icon={MoneyOff}
            iconColor="success"
            vertical
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <InfoArea
            title="Fragmentary Time"
            description="You can teach or learn at any time, from anywhere, making good use of fragmentary time, and do it on your own initiative under the rewards mechanism the APP provides."
            icon={AccessTime}
            iconColor="success"
            vertical
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <InfoArea
            title="Verified Tutors"
            description="Tutors are guaranteed to be native English speakers, able to not only help you with English speaking, but also provide you with unique oppotunities of cultural immersion."
            icon={VerifiedUser}
            iconColor="success"
            vertical
          />
        </GridItem>
      </GridContainer>
    </div>
  </div>
);

export default withStyles(productStyle)(ProductSection);
