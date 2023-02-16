/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
import { stateActionTypes } from './ActionTypes';

export const facetFilterStateReducer = (currentState, action) => {
  const { payload, type } = action;
  switch (type) {
    case stateActionTypes.SORT_SINGLE_FACET_SECTION:
      const { facet, sortBy } = payload;
      facet.sort_type = sortBy;
      return [...currentState];
    default:
      return currentState;
  }
};
