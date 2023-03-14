import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import env from '../../utils/env';
import { useAuth } from '../Auth/AuthProvider';
import { useGlobal } from '../Global/GlobalProvider';
import { PING_INTERVAL, REDIRECT_AFTER_SIGN_OUT, SHOW_WARNING_BEFORE } from '../../bento/siteWideConfig';

// TODO: Make seperate file for components
const dialogTitleStyles = (theme) => ({
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

const DialogTitle = withStyles(dialogTitleStyles)((props) => {
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

const DialogContent = withStyles(() => ({
  root: {
    padding: '51px 75px 10px',
    height: '65px',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '17px',
    fontWeight: '300',
    letterSpacing: '0',
    lineHeight: '24px',
  },
  buttonGroup: {
    textAlign: 'center',
  },
}))(MuiDialogContent);

// TODO: Make seperate file for utils of this component
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const secondsToMinuteString = (seconds) => new Date(seconds * 1000).toISOString().substring(14, 19);

const afterForcedSignOutMessage = (
  <div>
    <div>This authenticated session is no longer valid.</div>
    <div>Please login to establish a new session.</div>
  </div>
);

const InActivityDialog = ({ classes }) => {
  const { signOut } = useAuth();
  const { Notification } = useGlobal();
  const { isSignedIn } = useSelector((state) => state.login);
  const history = useHistory();
  const redirectAfterSignOut = REDIRECT_AFTER_SIGN_OUT;

  // States & Variables for this component
  const [open, setOpen] = React.useState(false);
  const [intervalID, setIntervalID] = React.useState(false);

  // NOTE: 300 seconds is dropped here as default value if none is set in config.
  const thresholdTime = parseInt(SHOW_WARNING_BEFORE, 10) || 300;

  const [timeLeft, setTimeLeft] = React.useState(thresholdTime);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const extandSession = async () => {
    const AUTH_API = env.REACT_APP_AUTH_SERVICE_API;
    try {
      const res = await fetch(`${AUTH_API}authenticated`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).catch(() => {
      });

      if (res.status) {
        handleClose();
      }
    } catch (e) {
      // Add Erro handler here.
    }
  };

  const handleExtandSession = () => {
    extandSession();
    handleClose();
  };

  const handleSignOut = () => {
    signOut(history, redirectAfterSignOut);
    handleClose();
    Notification.show(afterForcedSignOutMessage, 100000);
  };

  const loadData = async () => {
    const AUTH_API = env.REACT_APP_AUTH_SERVICE_API;
    try {
      const res = await fetch(`${AUTH_API}session-ttl`);
      const data = await res.json();
      const { ttl } = data;

      if (ttl <= 0) {
        // If user did not select any option and timed out in BE.
        handleSignOut();
      } else if (ttl > 0 && ttl <= thresholdTime) {
        setTimeLeft(ttl);
        handleOpen();
      }
    } catch (e) {
      // Add Erro handler here.
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      // NOTE: 1000 milliseconds = 1 second, PING_INTERVAL * 1000 = PING_INTERVAL milliseconds;
      const ID = setInterval(loadData, (parseInt(PING_INTERVAL, 10) || 10) * 1000);
      setIntervalID(ID);
    } else {
      clearInterval(intervalID);
    }
  }, [isSignedIn]);

  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        aria-labelledby="customized-dialog-title"
        open={open}
        keepMounted
        BackdropProps={{
          style: {
            opacity: 0.5,
            backgroundColor: '#141823',
          },
        }}
        PaperProps={{
          style: {
            height: 300,
            width: 500,
            borderRadius: 10,
            border: '0.5px solid #000000',
            boxShadow: '0 0 29px 16px rgba(0,0,0,0.36)',
          },
        }}
      >
        <DialogTitle id="customized-dialog-title">
          {/* onClose={handleClose} can be added to add "X" button on the top */}
          Session Timeout Warning
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            <div>
              This session is about to expire due to inactivity.
              You will be logged out in
              {' '}
              {secondsToMinuteString(timeLeft)}
              {' '}
              minutes.
            </div>
            <div>
              Please elect to extend this session or logout.
            </div>
          </Typography>
          <div className={classes.alignCenter}>
            <Button
              variant="contained"
              className={[classes.buttonGroup, classes.extandButton]}
              autoFocus
              onClick={handleExtandSession}
            >
              EXTEND SESSION
            </Button>
            <Button
              variant="contained"
              className={[classes.buttonGroup, classes.logOutButton]}
              onClick={handleSignOut}
            >
              LOGOUT
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const styles = () => ({
  alignCenter: {
    textAlign: 'center',
  },
  buttonGroup: {
    color: '#FFFFFF',
    fontFamily: 'Lato',
    fontSize: '11px',
    lineHeight: '22px',
    width: '150px',
    border: '1px solid #626262',
    marginTop: '30px',
  },
  extandButton: {
    backgroundColor: '#566672',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  logOutButton: {
    marginLeft: '20px',
    backgroundColor: '#437BBE',
    '&:hover': {
      backgroundColor: '#437BBE',
    },
  },
});

export default withStyles(styles, { withTheme: true })(InActivityDialog);
