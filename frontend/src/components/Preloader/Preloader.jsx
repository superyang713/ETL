import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: blue[500],
    zIndex: 1,
  },
});

class Preloader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          {<CircularProgress size={68} className={classes.fabProgress} />}
        </div>
      </div>
    );
  }
}

Preloader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Preloader);

