import { sideBarActionTypes } from './ActionTypes';

export const toggleCheckBox = (toggleCheckBoxItem) => ({
  type: sideBarActionTypes.FACET_VALUE_CHANGED,
  payload: toggleCheckBoxItem
});

export const toggleSilder = (slider) => ({
  type: sideBarActionTypes.ON_TOGGLE_SLIDER,
  payload: slider
});

export const clearAllFilters = () => ({ type: sideBarActionTypes.CLEAR_ALL_FILTERS });

export const clearFacetSection = (facetSection) => ({
  type: sideBarActionTypes.CLEAR_FACET_SECTION,
    payload: {
      facetSection
    },
});

export const clearSliderSection = (facetSection) => ({
  type: sideBarActionTypes.CLEAR_SLIDER_SECTION,
    payload: {
      facetSection
    },
});
