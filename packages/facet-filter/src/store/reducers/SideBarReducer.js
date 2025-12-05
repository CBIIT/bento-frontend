/* eslint-disable no-case-declarations */
import { sideBarActionTypes } from '../actions/ActionTypes';

const initFilterState = {
  searchState: {},
  sortState: {},
  timeUnitState: {},
  unknownAgesState: {},
  expandState: {}, // Add this line
};

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

export const onClearSliderSection = ({
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

export const onSearchTextChange = ({
  datafield,
  searchText,
  searchState,
}) => {
  const updatedState = { ...searchState };
  updatedState[datafield] = searchText;
  return updatedState;
};

export const onSortChange = ({
  datafield,
  sortBy,
  sortState,
}) => {
  const updatedState = { ...sortState };
  updatedState[datafield] = sortBy;
  return updatedState;
};

export const onTimeUnitChange = ({
  datafield,
  timeUnit,
  timeUnitState,
}) => {
  const updatedState = { ...timeUnitState };
  updatedState[datafield] = timeUnit;
  return updatedState;
};

export const onUnknownAgesChange = ({
  datafield,
  unknownAges,
  unknownAgesState,
}) => {
  const updatedState = { ...unknownAgesState };
  updatedState[datafield] = unknownAges;
  return updatedState;
};

export const onToggleFacetExpand = ({
  datafield,
  expanded,
  expandState,
}) => {
  const updatedState = { ...expandState };
  updatedState[datafield] = expanded;
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
            unknownAgesState: {},
          };
        case sideBarActionTypes.CLEAR_FACET_SECTION:
          updateState = onClearFacetSection({ ...payload, ...state });
          return {
            ...state,
            filterState: { ...updateState },
          };
        case sideBarActionTypes.CLEAR_SLIDER_SECTION:
          updateState = onClearSliderSection({ ...payload, ...state });
          // Also reset the corresponding unknownAges parameter
          const { datafield } = payload;
          const updatedUnknownAgesState = { ...state.unknownAgesState };
          if (updatedUnknownAgesState[datafield]) {
            updatedUnknownAgesState[datafield] = 'include';
          }
          return {
            ...state,
            filterState: { ...updateState },
            unknownAgesState: updatedUnknownAgesState,
          };
        case sideBarActionTypes.CLEAR_AND_SELECT_FACET_VALUE:
          return {
            filterState: payload,
          };
        case sideBarActionTypes.SEARCH_TEXT_CHANGED:
          updateState = onSearchTextChange({ ...payload, ...state });
          return {
            ...state,
            searchState: { ...updateState },
          };
        case sideBarActionTypes.SORT_CHANGED:
          updateState = onSortChange({ ...payload, ...state });
          return {
            ...state,
            sortState: { ...updateState },
          };
        case sideBarActionTypes.UPDATE_FILTER_STATE:
          return {
            ...state,
            filterState: payload,
          };
        case sideBarActionTypes.TIME_UNIT_CHANGED:
          updateState = onTimeUnitChange({ ...payload, ...state });
          return {
            ...state,
            timeUnitState: { ...updateState },
          };
        case sideBarActionTypes.UNKNOWN_AGES_CHANGED:
          updateState = onUnknownAgesChange({ ...payload, ...state });
          return {
            ...state,
            unknownAgesState: { ...updateState },
          };
        case sideBarActionTypes.TOGGLE_FACET_EXPAND:
          updateState = onToggleFacetExpand({ ...payload, ...state });
          return {
            ...state,
            expandState: { ...updateState },
          };
        default:
          return state;
      }
    },
  };
}
