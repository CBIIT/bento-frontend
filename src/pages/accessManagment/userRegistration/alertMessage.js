import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
  myAlert: {
    color: '#ffffff',
    backgroundColor: (props) => props.backgroundColor || '#5D53F6',
    width: '535px',
    boxSizing: 'border-box',
    height: '50px',
    border: '1.5px solid #88B4DA',
    boxShadow: '-4px 8px 27px 4px rgba(27,28,28,0.09)',
    justifyContent: 'center',
  },
}));

const AlertMessage = (props) => {
  // the alert is displayed by default
  const [alert, setAlert] = useState(true);

  const { severity, timeout, children } = props;

  const classes = useStyles(props);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
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
