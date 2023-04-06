import { ActionTypes } from './ActionTypes';

export const signInRed = (data) => ({
  type: ActionTypes.SIGN_IN,
  payload: data,
});

export const signOutRed = () => ({
  type: ActionTypes.SIGN_OUT,
});
