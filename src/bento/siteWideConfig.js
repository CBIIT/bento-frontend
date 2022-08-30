export default {
  // Suggested for replaceEmptyValueWith: 'N/A' or '-' or ''
  replaceEmptyValueWith: '',
  // Enable authenication
  enableAuthentication: true,
  // List for options for authentication empty array defaults to google
  authProviders: ['google', 'nih', 'loginGov'], // authEndPoint: []
};

export const loginRoute = '/login';
export const requestAccessRoute = '/request';
export const adminPortal = '/admin';
export const userProfileRoute = '/profile';

// Public Level Access
export const PUBLIC_ACCESS = 'none';

// Node level access
export const NODE_LEVEL_ACCESS = true;
export const NODE_NAME = 'Arm';
export const NODE_LABEL = 'Study Arm(s)';
