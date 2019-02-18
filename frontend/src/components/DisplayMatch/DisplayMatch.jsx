import React from "react";
import classNames from "classnames";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";


function DisplayMatch({ ...props }) {
  const {classes, matched_user, matchImage} = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <div className={classes.profile}>
          <div>
            <img
              style={{display: matchImage ? "block" : "none"}}
              src={matchImage}
              alt="..."
              className={imageClasses}
            />
          </div>
          <div className={classes.name}>
            <h3 className={classes.title}>
              {matched_user.firstName} {matched_user.lastName}
            </h3>
            <h6>{matched_user.role}</h6>
          </div>
        </div>
      </GridItem>
    </GridContainer>
  );
}

export default DisplayMatch;
