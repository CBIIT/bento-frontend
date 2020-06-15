import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {
  withStyles,
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { Typography } from '../Wrappers/Wrappers';

function PositionedSnackbar({ classes }) {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'bottom',
    horizontal: 'right',
  });

  const { vertical, horizontal, open } = state;

  function handleClose() {
    setState({ ...state, open: false });
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        // classes={{ anchorOriginTopRight: classes.myClassName }}

      >
        <SnackbarContent
          className={classes.warning}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={(
            <span className={classes.inline}>
              <WarningIcon className={classes.icon} />
              <Typography color="textWhite">
                <b>Please note:</b>
&nbsp;Data is purely representational and does not reflect actual values or subjects
                {' '}
              </Typography>
            </span>
)}
        />
      </Snackbar>
    </div>
  );
}

const styles = {
  warning: {
    backgroundColor: '#FFA000',
  },
  icon: {
    opacity: 0.9,
    marginRight: '8px',
    fontSize: '20px',
  },
  inline: {
    display: 'inline-flex',
  },
  // myClassName: {
  //     top: '140px'
  //   }
};

export default withStyles(styles)(PositionedSnackbar);
