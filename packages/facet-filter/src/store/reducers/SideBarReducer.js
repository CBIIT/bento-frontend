/* eslint-disable no-case-declarations */
import { sideBarActionTypes } from '../actions/ActionTypes';

const initFilterState = {
  filterState: {},
  searchState: {},
  sortState: {},
  unknownAgesState: {},
  timeUnitState: {},
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
  unknownAgesState,
}) => {
  const updatedFilterState = { ...filterState };
  const updatedUnknownAgesState = { ...unknownAgesState };
  const { datafield } = facetSection;

  if (updatedFilterState[datafield]) {
    delete updatedFilterState[datafield];
  }

  // Also clear the unknownAgesState for this datafield
  if (updatedUnknownAgesState[datafield]) {
    delete updatedUnknownAgesState[datafield];
  }

  return { filterState: updatedFilterState, unknownAgesState: updatedUnknownAgesState };
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
            searchState: {},
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
          return {
            ...state,
            filterState: { ...updateState.filterState },
            unknownAgesState: { ...updateState.unknownAgesState },
          };
        case sideBarActionTypes.CLEAR_AND_SELECT_FACET_VALUE:
          return {
            ...state,
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
        default:
          return state;
      }
    },
  };
}
