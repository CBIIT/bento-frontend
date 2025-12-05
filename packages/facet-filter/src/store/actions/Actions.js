import { sideBarActionTypes } from './ActionTypes';

export const toggleCheckBox = (toggleCheckBoxItem) => ({
  type: sideBarActionTypes.FACET_VALUE_CHANGED,
  payload: toggleCheckBoxItem,
});

export const toggleSilder = (slider) => ({
  type: sideBarActionTypes.ON_TOGGLE_SLIDER,
  payload: slider,
});

export const clearAllFilters = () => ({ type: sideBarActionTypes.CLEAR_ALL_FILTERS });

export const clearFacetSection = (facetSection) => ({
  type: sideBarActionTypes.CLEAR_FACET_SECTION,
  payload: {
    facetSection,
  },
});

export const clearSliderSection = (facetSection) => ({
  type: sideBarActionTypes.CLEAR_SLIDER_SECTION,
  payload: {
    facetSection,
  },
});

export const clearAllAndSelectFacet = (facetValue) => ({
  type: sideBarActionTypes.CLEAR_AND_SELECT_FACET_VALUE,
  payload: facetValue,
});

export const searchTextChange = (datafield, searchText) => ({
  type: sideBarActionTypes.SEARCH_TEXT_CHANGED,
  payload: {
    datafield,
    searchText,
  },
});

export const sortChange = (datafield, sortBy) => ({
  type: sideBarActionTypes.SORT_CHANGED,
  payload: {
    datafield,
    sortBy,
  },
});

export const updateFilterState = (filterState) => ({
  type: sideBarActionTypes.UPDATE_FILTER_STATE,
  payload: filterState,
});

export const timeUnitChange = (datafield, timeUnit) => ({
  type: sideBarActionTypes.TIME_UNIT_CHANGED,
  payload: {
    datafield,
    timeUnit,
  },
});

export const unknownAgesChange = (datafield, unknownAges) => ({
  type: sideBarActionTypes.UNKNOWN_AGES_CHANGED,
  payload: {
    datafield,
    unknownAges,
  },
});

export const toggleFacetExpand = (datafield, expanded) => ({
  type: sideBarActionTypes.TOGGLE_FACET_EXPAND,
  payload: {
    datafield,
    expanded,
  },
});
