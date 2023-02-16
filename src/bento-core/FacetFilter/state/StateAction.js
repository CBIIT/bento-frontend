import { stateActionTypes } from './ActionTypes';

export const sortSection = (facet, sortBy) => ({
  type: stateActionTypes.SORT_SINGLE_FACET_SECTION,
  payload: {
    facet,
    sortBy,
  },
});

export const updateState = (sections) => ({
  type: stateActionTypes.UPDATE_STATE,
  payload: sections,
});
