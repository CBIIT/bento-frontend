/* eslint-disable no-case-declarations */
import { sideBarActionTypes } from '../actions/ActionTypes';

const initFilterState = {};

export const onToggleStateUpdate = ({
  filterState,
  datafield,
  isChecked,
  name,
}) => {
  const updatedState = { ...filterState };
  if (!updatedState[datafield]) {
    updatedState[datafield] = {};
  }
  if (isChecked) {
    updatedState[datafield][name] = isChecked;
  } else {
    delete updatedState[datafield][name];
  }
  return updatedState;
};

export const onClearFacetSection = ({
  filterState,
  facetSection,
}) => {
  const updatedState = { ...filterState };
  const { datafield } = facetSection;
  if (updatedState[datafield]) {
    updatedState[datafield] = {};
  }
  return updatedState;
};

const onClearSliderSection = ({
  filterState,
  facetSection,
}) => {
  const updatedState = { ...filterState };
  const { datafield } = facetSection;
  if (updatedState[datafield]) {
    delete updatedState[datafield];
  }
  return updatedState;
};

export const updateSiderValue = ({
  datafield,
  sliderValue,
  filterState,
}) => {
  const updatedState = { ...filterState };
  updatedState[datafield] = sliderValue;
  return updatedState;
};

export function sideBarReducerGenerator() {
  return {
    actionTypes: sideBarActionTypes,
    statusReducer: (state = initFilterState, action) => {
      const { payload, type } = action;
      let updateState;
      switch (type) {
        case sideBarActionTypes.FACET_VALUE_CHANGED:
          updateState = onToggleStateUpdate({ ...state, ...payload });
          return {
            ...state,
            filterState: { ...updateState },
          };
        case sideBarActionTypes.ON_TOGGLE_SLIDER:
          updateState = updateSiderValue({ ...state, ...payload });
          return {
            ...state,
            filterState: { ...updateState },
          };
        case sideBarActionTypes.CLEAR_ALL_FILTERS:
          return {
            ...state,
            filterState: {},
          };
        case sideBarActionTypes.CLEAR_FACET_SECTION:
          updateState = onClearFacetSection({ ...payload, ...state });
          return {
            ...state,
            filterState: { ...updateState },
          };
        case sideBarActionTypes.CLEAR_SLIDER_SECTION:
          updateState = onClearSliderSection({ ...payload, ...state });
          return {
            ...state,
            filterState: { ...updateState },
          };
        case sideBarActionTypes.CLEAR_AND_SELECT_FACET_VALUE:
          return {
            filterState: payload,
          };
        default:
          return state;
      }
    },
  };
}
