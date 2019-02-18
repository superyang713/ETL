import React, { Component } from "react";
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import team1 from "assets/img/faces/marc.jpg";
import team2 from "assets/img/faces/team2.jpg";
import team3 from "assets/img/faces/team3.png";


class TeamSection extends Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Meet Our Team</h2>
        <div>
          <GridContainer>

            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team1} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  西西里
                  <br />
                  <small className={classes.smallTitle}>Business Development</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Mississippi Institute of Technology<br />
                    Talkative and funny
                  </p>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team2} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Yang Dai
                  <br />
                  <small className={classes.smallTitle}>Technical Lead</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    Homebrewer, and knows just enough chemistry to be dangerous.
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                    href="https://www.yangdai.info"
                  >
                    <i className={classes.socials + " fas fa-user-circle"} />
                  </Button>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                    href="https://github.com/superyang713"
                  >
                    <i className={classes.socials + " fab fa-github"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={team3} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  蓝猫
                  <br />
                  <small className={classes.smallTitle}>Spiritual Guide</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    A young cs student with a bright future. <br />
                    
                  </p>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                    href="https://github.com/yahuiliang"
                  >
                    <i className={classes.socials + " fab fa-github"} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>

          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
