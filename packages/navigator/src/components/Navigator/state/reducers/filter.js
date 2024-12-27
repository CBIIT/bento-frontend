import { updateNestedObject } from "../../utils/UpdateObject";

export const getFilterState = (
  currState,
  filterItem
) => {
  const { 
    facetSection,
    facet,
    facetItem,
    isChecked
  } = filterItem;
  //   const { filterSections } = currState;
  const updateFacetItem = {
    filterSections: {
      [facetSection]: {
        [facet]: {
          [facetItem]: {
            isChecked: isChecked,
          }
        }
      }
    }
  }
  // filterSections[facetSection][facet][facetItem].isChecked = isChecked;

  const updatedObject = updateNestedObject(currState, updateFacetItem);
  console.log(updatedObject);
  return currState;
}