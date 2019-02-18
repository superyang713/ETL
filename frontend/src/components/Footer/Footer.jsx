import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";

import Favorite from "@material-ui/icons/Favorite";
import footerStyle from "assets/jss/material-kit-react/components/footerStyle.jsx";


function Footer(props) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.yangdai.info/"
                className={classes.block}
                target="_blank"
                rel="noopener noreferrer"
              >
                Yang
              </a>
            </ListItem>
            
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.yangdai.info"
                className={classes.block}
                target="_blank"
                rel="noopener noreferrer"
              >
                About us
              </a>
            </ListItem>
            
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made with{" "}
          <Favorite className={classes.icon} /> by{" "}
          <a
            href="https://www.yangdai.info"
            className={aClasses}
            target="_blank"
            rel="noopener noreferrer"
          >
            Yang
          </a>{" "}
          for a better English Learning Experience.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
