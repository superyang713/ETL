import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import Button from "components/CustomButtons/Button.jsx";

const styles = theme => ({
  fabProgress: {
    color: blue[500],
    zIndex: 1,
  },
});

class LoadButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          {this.props.isLoading ?
            <div className={classes.root}>
              <div className={classes.wrapper}>
                {<CircularProgress size={68} className={classes.fabProgress} />}
              </div>
            </div>
            :
            <Button
              color="info"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              type="submit"
            >
              Find A Match
          </Button>}
        </form>
      </div>
    );
  }
}

LoadButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadButton);

