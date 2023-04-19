import React from 'react';
import {
  withStyles,
  DialogTitle as MuiDialogTitle,
  Typography, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const DialogTitle = ((props) => {
  const {
    children, classes, onClose, ...other
  } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const styles = (theme) => ({
  root: {
    margin: 0,
    paddingTop: '8px',
    paddingLeft: '30px',
    backgroundColor: '#6D89A2',
    height: '45px',
    color: '#FFFFFF',
    fontFamily: 'Lato',
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '0',
    lineHeight: '37px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1) - 4,
    color: '#FFFFFF',
  },
});

export default withStyles(styles, { withTheme: true })(DialogTitle);
