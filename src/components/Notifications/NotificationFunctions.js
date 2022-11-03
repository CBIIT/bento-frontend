import React from 'react';

const NotificationFunctions = () => {
  // States
  const [open, setOpen] = React.useState(false);
  const [duration, setDuration] = React.useState(10000);
  const [message, setMessage] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  // Variables

  // Methods for Notifications.
  const close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const show = (msg, timeoutDuration) => {
    setMessage(msg);
    setDuration(timeoutDuration);
    setOpen(true);
  };

  const getProps = () => ({
    open, duration, message, location,
  });

  return {
    show,
    close,
    getProps,
  };
};

export default NotificationFunctions;
