import { ActionTypes } from '../actions/ActionTypes';

const updateAfterSignInData = (data, state) => {
  const updatedState = { ...state };
  updatedState.isSignedIn = !!(data && (data instanceof Object) && data.email);
  return { ...updatedState, ...data };
};

const updateAfterSignOutData = () => {
  const updatedState = { };
  updatedState.isSignedIn = false;
  return updatedState;
};

/**
 *  A Function to read Initial login state from Local Storage.
 *
 * @type {object}
 */
export const loadStateFromLocal = (getFromLocalStorage) => {
  try {
    const userDetails = getFromLocalStorage('userDetails');

    const DEFAULT_INITIAL_STATE = {
      isSignedIn: false,
    };

    /*
      Note for Developer:
      Here we are checking does userDetails object contains at least email or not.
      Email is used in navigation bar as backup property when name is not present.
    */

    if (userDetails.email) {
      return { ...DEFAULT_INITIAL_STATE, ...userDetails, isSignedIn: true };
    }

    return DEFAULT_INITIAL_STATE;
  } catch (error) {
    return {
      isSignedIn: false,
    };
  }
};

/**
 * Generate reducer for Login
 *
 * @returns {object} reducer object
 */
export default function (getFromLocalStorage) {
  const initLoginState = loadStateFromLocal(getFromLocalStorage);

  return {
    login: (state = initLoginState, action) => {
      const { payload, type } = action;
      let updatedState;
      switch (type) {
        case ActionTypes.SIGN_IN:
          updatedState = updateAfterSignInData(payload, state);
          return {
            ...state,
            ...updatedState,
          };
        case ActionTypes.SIGN_OUT:
          updatedState = updateAfterSignOutData();
          return {
            ...updatedState,
          };
        default:
          return state;
      }
    },
  };
}
