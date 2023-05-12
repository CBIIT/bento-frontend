import env from '../utils/env';
import { getEnvBoolean } from '../utils/env';

export default {
  // Suggested for replaceEmptyValueWith: 'N/A' or '-' or ''
  replaceEmptyValueWith: '',
  // List for options for authentication empty array defaults to google
  authProviders: ['google', 'nih', 'loginGov'], // authEndPoint: []//
};



export const loginPath = '/login';
export const requestAccessPath = '/request';
export const adminPortalPath = '/admin';
export const userProfilePath = '/profile';

// Authentication: Enabled (True) or Disabled (False)
export const enableAuthentication = getEnvBoolean(env.REACT_APP_AUTH, true);

// List of enabled identity providers. This is an array of enabled identity providers,
// where each element corresponds to a key from loginProvidersData.
export const enabledAuthProviders = ['google', 'nih', 'loginGov'];

// Public Level Access
export const PUBLIC_ACCESS = env.PUBLIC_ACCESS || 'Metadata Only';

// Node level access
export const NODE_LEVEL_ACCESS = getEnvBoolean(env.NODE_LEVEL_ACCESS, true);
export const NODE_LABEL = env.NODE_LABEL || 'Study Arm(s)';

// Redirect configs.
export const REDIRECT_AFTER_SIGN_OUT = '/';

// Inactivity Configs (Numbers are in "Seconds" for this section)
export const PING_INTERVAL = 10; // DEFAULT is 5 Seconds.

// SHOW_WARNING_BEFORE is used to configure when to show Inactivity pop-up.
// Value is required to be in Seconds format. DEFAULT is 300 Seconds (5 Minutes).
export const SHOW_WARNING_BEFORE = 300;
