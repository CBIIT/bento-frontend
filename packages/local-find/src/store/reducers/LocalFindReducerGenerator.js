import { ActionTypes } from '../actions/ActionTypes';

/**
 * Initial state for LocalFind
 *
 * @type {object}
 */
const initFilterState = {
  upload: [],
  autocomplete: [],
  uploadMetadata: {},
};

const updateUploadData = (data, state) => {
  const updatedState = { ...state };
  updatedState.upload = data && (data instanceof Array) && data.length ? data : [];
  return updatedState;
};

const updateUploadMetadata = (data, state) => {
  const updatedState = { ...state };
  updatedState.uploadMetadata = data;
  return updatedState;
};

const updateAutocompleteData = (data, state) => {
  const updatedState = { ...state };
  updatedState.autocomplete = data && (data instanceof Array) && data.length ? data : [];
  return updatedState;
};

/**
 * Generate reducer for LocalFind
 *
 * @returns {object} reducer object
 */
export default function () {
  return {
    localFind: (state = initFilterState, action) => {
      const { payload, type } = action;
      let updatedState;
      switch (type) {
        case ActionTypes.UPDATE_LOCALFIND_UPLOAD_DATA:
          updatedState = updateUploadData(payload, state);
          return {
            ...state,
            ...updatedState,
          };
        case ActionTypes.UPDATE_LOCALFIND_AUTOCOMPLETE_DATA:
          updatedState = updateAutocompleteData(payload, state);
          return {
            ...state,
            ...updatedState,
          };
        case ActionTypes.UPDATE_LOCALFIND_UPLOAD_METADATA:
          updatedState = updateUploadMetadata(payload, state);
          return {
            ...state,
            ...updatedState,
          };
        case ActionTypes.RESET_LOCALFIND_UPLOAD_DATA:
          updatedState = updateUploadData([], state);
          return {
            ...state,
            ...updatedState,
          };
        default:
          return state;
      }
    },
  };
}
