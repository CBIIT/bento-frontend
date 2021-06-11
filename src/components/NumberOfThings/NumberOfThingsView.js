import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';

const defaultFooterStyles = {

};

const NumberOfThing = ({
  number: numberOfThing, title, alt, icon, classes,
}) => (

  <div className={classes.widgetContainer}>
    <div className={classes.numberOfFiles}>{title}</div>

    <Grid container className={classes.fileCountContainer}>
      <Grid item xs={12}>
        <div className={classes.fileIconContainer}>
          <img
            src={icon}
            alt={alt}
            className={classes.fileIcon}
          />
          <div className={classes.fileCountText}>
            <span className={classes.fileNumber} id="file_count">{numberOfThing}</span>
          </div>
        </div>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(NumberOfThing);
