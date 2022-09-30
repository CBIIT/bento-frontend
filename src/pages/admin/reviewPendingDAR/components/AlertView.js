import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
  myAlert: {
    color: '#ffffff',
    backgroundColor: (props) => props.backgroundColor || '#5D53F6',
    width: '535px',
    boxSizing: 'border-box',
    height: '70px',
    boxShadow: '-4px 8px 27px 4px rgba(27,28,28,0.09)',
    justifyContent: 'center',
    fontSize: '16px',
    fontFamily: 'Nunito',
    borderRadius: '0px',
  },
}));

const AlertMessage = (props) => {
  const {
    severity, timeout, onClose, children,
  } = props;

  const classes = useStyles(props);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      onClose('');
    }, timeout || 5000);
  }, []);

  return (
    <>
      {alert && (
      <Alert icon={false} severity={severity} className={classes.myAlert}>
        {children}
      </Alert>
      )}
    </>
  );
};

export default AlertMessage;
