import React from 'react';

/* eslint-disable no-unused-vars */
/**
 * Default configuration for Session Timeout
 */
export const DEFAULT_CONFIG_SESSIONTIMEOUT = {
  // Misc. Configuration Options
  config: {
    // Show the timeout warning dialog N seconds before the session expires
    thresholdTime: 300,
    // Interval to ping the server ttl endpoint
    pingInterval: 10,
    // The message to show if the extend session request fails
    extendSessionError: 'Unable to extend session. Please try again.',
    // The message to show after the user has signed out (React Component or string)
    afterSignout: (
      <div>
        <div>This authenticated session is no longer valid.</div>
        <div>Please login to establish a new session.</div>
      </div>
    ),
    // The endpoint to ping to extend the session
    extendEndpoint: '',
    // The endpoint to ping to get the session ttl
    ttlEndpoint: '',
  },

  // Redux State Selectors
  selectors: {
    /**
     * Selects whether the user is signed in from the global Redux state
     *
     * Note:
     * - If a user is signed in, the component is activated.
     *
     * @param {object} state Redux state
     * @returns {boolean} Whether the user is signed in
     */
    isSignedIn: (state) => state.login && state.login.isSignedIn,
  },
};

export default DEFAULT_CONFIG_SESSIONTIMEOUT;
