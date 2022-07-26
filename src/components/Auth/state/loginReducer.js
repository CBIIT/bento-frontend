import store from '../../../store';
import { getFromLocalStorage } from '../../../utils/localStorage';

const storeKey = 'login';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const loadState = () => {
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

const initialState = loadState();

export const signInRed = (userDetails) => store.dispatch(
  { type: SIGN_IN, payload: { userDetails } },
);

export const signOutRed = () => store.dispatch({ type: SIGN_OUT });

const reducers = {
  SIGN_IN:
    (state, item) => ({
      ...state, isSignedIn: true, ...item.userDetails,
    }),
  SIGN_OUT:
    (state) => (
      {
        ...state,
        isSignedIn: false,
        userId: null,
        email: null,
      }
    ),

};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
