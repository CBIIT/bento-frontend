import { sideBarActionTypes } from '../actions/ActionTypes'

const initFilterState = {}

export const onToggleStateUpdate = ({
  filterState,
  datafield,
  isChecked,
  name
}) => {
    const updatedState = {...filterState};
    if (!updatedState[datafield]) {
        updatedState[datafield] = {};
    }
    if (isChecked) {
      updatedState[datafield][name] = isChecked;
    } else {
      delete updatedState[datafield][name];
    }
    return updatedState;
}

export const onClearFacetSection = ({
  filterState,
  facetSection,
}) => {
  const updatedState = {...filterState};
  const { datafield } = facetSection;
  if (updatedState[datafield]) {
    updatedState[datafield] = {};
  }
  return updatedState;
}

const onClearSliderSection = ({
  filterState,
  facetSection,
}) => {
  const updatedState = {...filterState};
  const { datafield, minLowerBound, maxUpperBound} = facetSection;
  const range = [minLowerBound, maxUpperBound];
  if (updatedState[datafield]) {
    delete updatedState[datafield];
  }
  return updatedState;
}

export function updateSiderValue({
    datafield,
    sliderValue,
    filterState
 }) {
  const updatedState = {...filterState};
  updatedState[datafield] = sliderValue;
  return updatedState;
}

export function sideBarReducerGenerator() {
    return {
        actionTypes: sideBarActionTypes,
        statusReducer: (state = initFilterState, action) => {
            const { payload, type } = action;

            switch (type){  
                case sideBarActionTypes.FACET_VALUE_CHANGED:
                    const updateFilterValue = onToggleStateUpdate({...state, ...payload});
                    return {
                        ...state,
                        filterState: {...updateFilterValue},
                    };
                case sideBarActionTypes.ON_TOGGLE_SLIDER:
                    const updateSliderValue = updateSiderValue({...state, ...payload});
                    return {
                        ...state,
                        filterState: {...updateSliderValue},
                    }
                case sideBarActionTypes.CLEAR_ALL_FILTERS:
                    return {
                        ...state,
                        filterState: {},
                    }
                case sideBarActionTypes.CLEAR_FACET_SECTION:
                    const clearFacetSection = onClearFacetSection({...payload, ...state});
                    return {
                        ...state,
                        filterState : {...clearFacetSection}
                    }
                case sideBarActionTypes.CLEAR_SLIDER_SECTION:
                    const clearSliderSection = onClearSliderSection({...payload, ...state});
                    return {
                        ...state,
                        filterState : {...clearSliderSection}
                    }
                default:
                    return state;
            };
        },
    }
}
