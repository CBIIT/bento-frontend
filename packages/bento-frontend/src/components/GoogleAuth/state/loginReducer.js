import store from '../../../store';

const storeKey = 'login';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('username');

    if (serializedState === null) {
      return {
        isSignedIn: false,
        userId: null,
      };
    }
    return {
      isSignedIn: true,
      userId: serializedState,
    };
  } catch (error) {
    return {
      isSignedIn: false,
      userId: null,
    };
  }
};

const initialState = loadState();

export const signInRed = (userId = null) => store.dispatch({ type: SIGN_IN, payload: userId });

// export function signInRed() {
//   return {
//     type: SIGN_OUT,
//   };
// }

export const signOutRed = () => store.dispatch({ type: SIGN_OUT });

const reducers = {
  SIGN_IN:
    (state, item) => ({ ...state, isSignedIn: true, userId: item }),
  SIGN_OUT:
    (state) => (
      {
        ...state,
        isSignedIn: false,
        userId: null,
      }
    ),

};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));
