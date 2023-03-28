import { ActionTypes } from './ActionTypes';

export const updateAutocompleteData = (data) => ({
  type: ActionTypes.UPDATE_LOCALFIND_AUTOCOMPLETE_DATA,
  payload: data,
});

export const updateUploadData = (data) => ({
  type: ActionTypes.UPDATE_LOCALFIND_UPLOAD_DATA,
  payload: data,
});

export const updateUploadMetadata = (data) => ({
  type: ActionTypes.UPDATE_LOCALFIND_UPLOAD_METADATA,
  payload: data,
});

export const resetUploadData = (data) => ({
  type: ActionTypes.RESET_LOCALFIND_UPLOAD_DATA,
  payload: data,
});
