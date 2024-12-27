import { actionTypes } from "../actions/Action";
import { getFilterState } from "./filter";

const reducer = (state, action) => {
    const { type, payload } = action;
    const cloneState = structuredClone(state);
    switch (type) {
      case actionTypes.UPDATE_DICTIONARY:
        return {
          ...state,
          ...payload
        };
      case actionTypes.ON_TOGGLE_CHECKBOX:
        const updateState = getFilterState(cloneState, payload);
        return updateState;
      default:
        return state;
    }
}

export default reducer;
