import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  withStyles, Button, Dialog, Typography,
} from '@material-ui/core';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';
import DialogTitle from '../components/DialogTitle';
import DialogContent from '../components/DialogContent';
import { Transition } from '../components/Transition';
import { secondsToMinuteString, extendSession, getSessionTTL } from '../Utils/utils';

/**
 * Generate SessionTimeout component
 *
 * @param {object} uiConfig
 * @param {object} [uiConfig.config] Configuration options
 * @param {object} [uiConfig.selectors] Redux state selectors
 * @returns {object} { SessionTimeout }
 */
export const SessionTimeoutGenerator = ({ config, selectors } = DEFAULT_CONFIG) => {
  const thresholdTime = config && typeof config.thresholdTime === 'number'
    ? config.thresholdTime
    : DEFAULT_CONFIG.config.thresholdTime;

  const pingInterval = config && typeof config.pingInterval === 'number'
    ? config.pingInterval
    : DEFAULT_CONFIG.config.pingInterval;

  const afterSignout = config && (React.isValidElement(config.afterSignout) || typeof config.afterSignout === 'string')
    ? config.afterSignout
    : DEFAULT_CONFIG.config.afterSignout;

  const extendSessionError = config && (React.isValidElement(config.extendSessionError) || typeof config.extendSessionError === 'string')
    ? config.extendSessionError
    : DEFAULT_CONFIG.config.extendSessionError;

  const extendEndpoint = config && typeof config.extendEndpoint === 'string'
    ? config.extendEndpoint
    : DEFAULT_CONFIG.config.extendEndpoint;

  const ttlEndpoint = config && typeof config.ttlEndpoint === 'string'
    ? config.ttlEndpoint
    : DEFAULT_CONFIG.config.ttlEndpoint;

  const isSignedIn = selectors && typeof selectors.isSignedIn === 'function'
    ? selectors.isSignedIn
    : DEFAULT_CONFIG.selectors.isSignedIn;

  return {
    SessionTimeout: withStyles(DEFAULT_STYLES, { withTheme: true })((props) => {
      const {
        classes, signOut, showNotification,
        title, body,
      } = props;

      const signedIn = useSelector(isSignedIn);
      const [open, setOpen] = useState(false);
      const [intervalID, setIntervalID] = useState(false);
      const [timeLeft, setTimeLeft] = useState(thresholdTime);

      /**
       * Sign out the user and redirect
       */
      const signOutUser = typeof signOut === 'function' ? signOut : () => {};

      /**
       * Show a nofication to the user
       *
       * @param {string|React.Component} content The content to show in the notification
       * @param {number} duration The duration to show the notification for
       */
      const notifyUser = typeof showNotification === 'function' ? showNotification : () => {};

      const signoutWrapper = () => {
        setOpen(false);
        signOutUser();
        notifyUser(afterSignout, 100000);
      };

      const getSessionTTLWrapper = async () => {
        const ttl = await getSessionTTL(ttlEndpoint);
        if (ttl <= 0) {
          signoutWrapper();
        } else if (ttl > 0 && ttl <= thresholdTime) {
          setTimeLeft(ttl);
          setOpen(true);
        }
      };

      const setTimerWrapper = () => {
        // Clear the existing timer if it exists
        if (intervalID !== false) {
          clearInterval(intervalID);
        }

        // Set a new timer if the user is still signed in
        if (signedIn) {
          const ID = setInterval(getSessionTTLWrapper, pingInterval * 1000);
          setIntervalID(ID);
        }
      };

      const extendSessionWrapper = async () => {
        if (await extendSession(extendEndpoint)) {
          setOpen(false);
          setTimerWrapper(); // Reset the timer to the new TTL
        } else {
          notifyUser(extendSessionError, 5000);
        }
      };

      useEffect(setTimerWrapper, [signedIn]);

      return (
        <Dialog
          id="session-timeout-dialog"
          classes={classes}
          TransitionComponent={Transition}
          open={open}
          keepMounted
        >
          <DialogTitle id="session-timeout-title">
            { title || 'Session Timeout Warning' }
          </DialogTitle>
          <DialogContent id="session-timeout-content">
            { body
              || (
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
              )}
            <div className={classes.alignCenter}>
              <Button
                variant="contained"
                className={[classes.buttonGroup, classes.extandButton]}
                autoFocus
                onClick={extendSessionWrapper}
              >
                EXTEND SESSION
              </Button>
              <Button
                variant="contained"
                className={[classes.buttonGroup, classes.logOutButton]}
                onClick={signoutWrapper}
              >
                LOGOUT
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }),
  };
};

export default SessionTimeoutGenerator;
