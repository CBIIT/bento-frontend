import {
  facetSectionType,
  filterByNode,
  filterByProperty,
  level
 } from "../../../controller/Filter";
import { updateNestedObject } from "../../../utils/UpdateObject";
import { getCommonItems, getFacetItemCount } from "./FacetItemCount";

export const initFacetItemCount = (
  facetFilterData
) => {
  const facetItemCount = {};
  facetFilterData.forEach((item, index) => {
    filterByNode.forEach((facet) => {
      if (!facetItemCount[item[facet]]) {
        facetItemCount[item[facet]] = [];
      }
      if (!facetItemCount[item[facet]].includes(item.nodeName)) {
        facetItemCount[item[facet]].push(item.nodeName);
      }
    });
    filterByProperty.forEach((facet) => {
      if (!facetItemCount[item[facet]]) {
        facetItemCount[item[facet]] = [];
      }
      if (!facetItemCount[item[facet]].includes(item.propertyName)) {
        facetItemCount[item[facet]].push(item.propertyName);
      }
    });
  });
  return facetItemCount;
}


export const onFilterValueChange = (
  currState,
  filterItem
) => {
  const { 
    facetSection,
    facet,
    facetItem,
    isChecked
  } = filterItem;

  const currSelectedFacet = {
    [facetSection]: {
      [facet]: {
        [facetItem]: {
          isChecked: isChecked,
        }
      }
    }
  }

  const selectedFacetItem = {
    filterSections: {
      ...currSelectedFacet
    }
  };

  // set active filters
  const {
    activeFilters = {},
    facetFilterData,
    filterSections,
    facetItemCount: currFICount,
    dictionary,
    node2FacetItem,
    props2FacetItem
  } = currState;

  if (isChecked) {
    if (!activeFilters[facetSection]) {
      activeFilters[facetSection] = {};
    }
    activeFilters[facetSection][facetItem] = facet;
  } else {
    delete activeFilters[facetSection][facetItem];
  }
  
  // update active state
  const updatedObject = updateNestedObject(currState, selectedFacetItem);

  const currFacetItemsCount = Object.keys(filterSections[facetSection][facet])
  .reduce((acc, item) => {
    if (currFICount) {
      acc[item] = currFICount[item];
    }
    return acc;
  }, {});

  // attempt 2
  const { facetItemCount, filterNodes } = getFacetItemCount(
    currSelectedFacet,
    facet,
    currState,
    activeFilters,
    node2FacetItem,
    props2FacetItem
  );
  
  const filterDictionary = Object.keys(dictionary).reduce(
    (acc, item) => {
      if (filterNodes.includes(item)) {
        acc[item] = dictionary[item];
      }
      return acc;
    }, {});

  return {
    ...updatedObject,
    activeFilters,
    facetItemCount,
    filterDictionary
  };
}
