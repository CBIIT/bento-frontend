import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';

const AlertMessage = ({ severity, timeout, children }) => {
  // the alert is displayed by default
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
    }, timeout || 5000);
  }, []);

  return (
    <>
      {alert && <Alert severity={severity}>{children}</Alert>}
    </>
  );
};

export default AlertMessage;
