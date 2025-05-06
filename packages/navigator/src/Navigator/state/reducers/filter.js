/* eslint-disable no-undef */
import {
  filterByNode,
  filterByProperty,
} from '../../constant/Filter';
import {
  updateNestedObject,
  updateNestedValue,
} from '../../utils/UpdateObject';

const facetType = {
  CATEGORY: 'category',
  ASSIGNMENT: 'assignment',
};

const getActiveFiltersBySection = (filterItems) => {
  const activeFacetItems = Object.keys(filterItems || {})
    .reduce((acc, key) => {
      if (filterItems[key]) {
        const facet = filterItems[key];
        if (facet && !acc[facet]) {
          acc[facet] = [];
        }
        acc[facet].push(key);
      }
      return acc;
    }, {});
  return activeFacetItems;
};

const filterData = (data, activeFilters) => {
  if (Object.keys(activeFilters) === 0) {
    return data;
  }
  const filterItems = data.filter((row) => {
    const facets = Object.keys(activeFilters);
    let match = true;
    facets.forEach((facet) => {
      const selectedItems = activeFilters[facet] || [];
      if (!selectedItems.includes(row[facet])) {
        match = false;
      }
    });
    return match;
  });

  return filterItems;
};

const getNonCategoryFacetItem = (facetItems) => {
  const items = Object.keys(facetItems || {})
    .reduce((acc, key) => {
      if (key !== facetType.CATEGORY) {
        acc[key] = facetItems[key];
      }
      return acc;
    }, {});
  return items;
};

const getDistinctNode = (data) => {
  const distinctNodes = data.reduce(
    (acc, row) => {
      const { nodeName } = row;
      if (!acc.includes(nodeName)) {
        acc.push(nodeName);
      }
      return acc;
    }, [],
  );
  return distinctNodes;
};

const getNodeCount = (node2FacetItem, facetItemList, nodeList) => {
  const count = facetItemList.reduce((acc, facet) => {
    const nodes = node2FacetItem[facet];
    if (nodes) {
      const filtered = nodes.filter((item) => nodeList.includes(item));
      acc[facet] = filtered;
    }
    return acc;
  }, {});
  return count;
};

const getDistinctObjects = (data, key = 'nodeName') => {
  const distinctProperties = data.reduce(
    (acc, row) => {
      const objectValue = row[key];
      if (!acc.includes(objectValue)) {
        acc.push(objectValue);
      }
      return acc;
    }, [],
  );
  return distinctProperties;
};

const getItemCount = (facetItems2Objects, facetItemList, objectList) => {
  const count = facetItemList.reduce((acc, facet) => {
    const items = facetItems2Objects[facet];
    // if (!items) {
    //   console.log('it is undefined');
    //   console.log(facet);
    //   console.log(facetItems2Objects)
    // }
    if (items) {
      const selectedItems = items.filter((item) => objectList.includes(item));
      acc[facet] = selectedItems;
    }
    return acc;
  }, {});
  return count;
};

const getFilterDictionary = (dictionary, filteredNodes) => {
  const filterDictionary = Object.keys(dictionary).reduce(
    (acc, item) => {
      if (filteredNodes && filteredNodes.includes(item)) {
        acc[item] = dictionary[item];
      }
      return acc;
    }, {},
  );
  return filterDictionary;
};

export const getFacetItemCount = (
  isChecked,
  facet,
  currState,
  activeFilters,
  node2FacetItem,
  props2FacetItem,
) => {
  const {
    facetItemCount: currFacetItemCount,
    facet2FacetItem,
    facetFilterData: dataset,
    filterSections,
    filterDictionary,
  } = currState;
  const selectedFacetItems = facet2FacetItem[facet] || [];
  let facetFilterData = structuredClone(dataset);
  /**
  * active facet items by sections
  */
  // active filters by node
  const activeFiltersByNode = getActiveFiltersBySection(activeFilters?.filterByNode);
  // active filters by property
  const activeFiltersByProperty = getActiveFiltersBySection(activeFilters?.filterByProperty);

  const allActiveFacetItems = {
    ...activeFiltersByNode,
    ...activeFiltersByProperty,
  };

  // active filter by category
  const activeCategoryFilters = activeFiltersByNode.category || [];

  // active filter by none category
  const nonCategoryActiveFilters = getNonCategoryFacetItem(allActiveFacetItems);

  // active node filters without category
  const nonCategoryActiveFiltersByNode = getNonCategoryFacetItem(activeFiltersByNode);

  // console.log("STEP - 0 - if filter yeilds no results");
  /**
   * STEP 0
   * a. get filter nodes
   * b. if matching node is zero return current state
   */
  const step0Dataset = filterData(facetFilterData, allActiveFacetItems);

  const exclusiveNodes = step0Dataset.map((item) => item.nodeName);
  let filteredNodes = Array.from(new Set(exclusiveNodes));
  if (step0Dataset.length === 0) {
    filteredNodes = Object.keys(filterDictionary);
    if (!isChecked) {
      return {
        facetItemCount: currFacetItemCount,
        filteredNodes,
      };
    }
  }

  // console.log('STEP 1. filter by property - dataset 1');
  /**
   * STEP 1
   * a. apply filterByProperty - step1Dataset
   */
  const step1Dataset = filterData(facetFilterData, activeFiltersByProperty);
  facetFilterData = step1Dataset;

  /**
   * STEP 2
   * a. apply any filterByCategory on step1Dataset
   */
  let step2Dataset = step1Dataset;
  if (activeCategoryFilters.length > 0) {
    step2Dataset = filterData(step1Dataset, { category: activeCategoryFilters });
  }

  /**
   * STEP 3
   * a. getDistinctNode from step2Dataset
   * b. getNodeCount for non category facet (assignment, class)
   */
  const step3NodeList = getDistinctNode(step2Dataset);
  const step3Facet2Count = [...facet2FacetItem.assignment, ...facet2FacetItem.class];
  const step3Count = getNodeCount(node2FacetItem, step3Facet2Count, step3NodeList);

  // console.log(' STEP 4 - Use non category active facet category node count
  // - use nonCategoryActiveFiltersByNode');
  const step4Dataset = filterData(step1Dataset, nonCategoryActiveFiltersByNode);
  const step4NodeList = getDistinctNode(step4Dataset);
  const step4Count = getNodeCount(node2FacetItem, facet2FacetItem.category, step4NodeList);

  // console.log(' STEP 5 - count - nodeNonCategoryFacets');
  const step5Dataset = filterData(step2Dataset, nonCategoryActiveFiltersByNode);
  const step5NodeList = getDistinctNode(step5Dataset);
  const step5Count = getNodeCount(node2FacetItem, step3Facet2Count, step5NodeList);

  let step6Dataset = [];
  let step6Count = {};
  if (facet === facetType.ASSIGNMENT && isChecked) {
    // console.log('STEP - 6 - count item base on selected facet item');
    step6Dataset = filterData(step1Dataset, { [facet]: nonCategoryActiveFilters[facet] });
    const step6NodeList = getDistinctNode(step6Dataset);
    const step6Facet2Count = step3Facet2Count
      .filter((item) => !(nonCategoryActiveFilters[facet] || []).includes(item));
    step6Count = getNodeCount(node2FacetItem, step6Facet2Count, step6NodeList);
  }

  // console.log('STEP - 7 - count property facet item');
  const propertyFacets = [...facet2FacetItem.display, ...facet2FacetItem.inclusion];
  const step7Dataset = filterData(dataset, activeFiltersByNode);
  const step7PropertyList = getDistinctObjects(step7Dataset, 'propertyId');
  let step7Count = getItemCount(props2FacetItem, propertyFacets, step7PropertyList);

  if (Object.keys(activeFiltersByProperty).length > 0) {
    // console.log(activeFiltersByProperty);
    Object.keys(activeFiltersByProperty).forEach((facetItem) => {
      const item = activeFiltersByProperty[facetItem];
      const step7PropertyDataset = filterData(step7Dataset, { [facetItem]: item });
      const step7FilterPropertyList = getDistinctObjects(step7PropertyDataset, 'propertyId');
      const propFaceItemsCount = Object.keys(filterSections.filterByProperty).reduce(
        (acc, obj) => {
          if (obj !== facetItem) {
            if (!acc.includes(obj)) {
              acc.push(...facet2FacetItem[obj]);
            }
          }
          return acc;
        }, [],
      );
      const step7PropertyCount = getItemCount(
        props2FacetItem,
        propFaceItemsCount,
        step7FilterPropertyList,
      );
      // console.log(step7PropertyCount);
      step7Count = {
        ...step7Count,
        ...step7PropertyCount,
      };
    });
  }
  /**
  * STEP - 7 or last step
  * Restore the count for currently toggled facet
  * the count for the facet should not change
  */
  const prevFacetItemCount = {};
  selectedFacetItems.forEach((facetItem) => {
    if (currFacetItemCount[facetItem]) {
      prevFacetItemCount[facetItem] = currFacetItemCount[facetItem];
    } else {
      prevFacetItemCount[facetItem] = [];
    }
  });

  const facetItemCount = {
    ...step3Count,
    ...step4Count,
    ...step5Count,
    ...step6Count,
    ...step7Count,
    ...prevFacetItemCount,
  };
  // console.log("************************ FACET ITEM COUNT 2 ************************");

  return {
    facetItemCount, filteredNodes,
  };
};

export const initFacetItemCount = (
  facetFilterData,
) => {
  const facetItemCount = {};
  facetFilterData.forEach((item) => {
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
      if (item.propertyId) {
        facetItemCount[item[facet]].push(item.propertyId);
      }
    });
  });
  return facetItemCount;
};

export const onToggleFacetFilter = (
  currState,
  filterItem,
) => {
  const {
    facetSection,
    facet,
    facetItem,
    isChecked,
  } = filterItem;

  const currSelectedFacet = {
    [facetSection]: {
      [facet]: {
        [facetItem]: {
          isChecked,
        },
      },
    },
  };

  const selectedFacetItem = {
    filterSections: {
      ...currSelectedFacet,
    },
  };

  // set active filters
  const {
    activeFilters = {},
    dictionary,
    node2FacetItem,
    props2FacetItem,
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

  const {
    filteredNodes,
    facetItemCount,
  } = getFacetItemCount(
    isChecked,
    facet,
    currState,
    activeFilters,
    node2FacetItem,
    props2FacetItem,
  );

  const filterDictionary = Object.keys(dictionary).reduce(
    (acc, item) => {
      if (filteredNodes && filteredNodes.includes(item)) {
        acc[item] = dictionary[item];
      }
      return acc;
    }, {},
  );

  return {
    ...updatedObject,
    activeFilters,
    facetItemCount,
    filterDictionary,
  };
};

export const getInitState = (state) => {
  const cloneState = structuredClone(state);
  const {
    dictionary,
    filterSections,
    node2FacetItem,
    props2FacetItem,
  } = cloneState;

  /**
   * init count
   */
  const {
    facetItemCount,
  } = getFacetItemCount(
    false,
    null,
    cloneState,
    [],
    node2FacetItem,
    props2FacetItem,
  );

  /**
  * uncheck all filters
  * reset active filters
  */
  updateNestedValue(filterSections, false, 'isChecked');

  return {
    ...cloneState,
    activeFilters: {},
    filterDictionary: dictionary,
    facetItemCount,
    filterSections,
  };
};

export const clearActiveFacetSection = (section, facet, state) => {
  const {
    dictionary,
    filterSections,
    node2FacetItem,
    props2FacetItem,
    activeFilters,
  } = state;
  /**
  * uncheck all filters
  * reset active filters
  */
  updateNestedValue(filterSections[section][facet], false, 'isChecked');
  // for (const [key, value] of Object.entries(activeFilters[section])) {
  //   if (value === facet) {
  //     delete activeFilters[section][key];
  //   }
  // }
  Object.entries(activeFilters[section]).forEach(([key, value]) => {
    if (value === facet) {
      delete activeFilters[section][key];
    }
  });
  /**
   * init count
   */
  const {
    filteredNodes,
    facetItemCount,
  } = getFacetItemCount(
    false,
    facet,
    state,
    activeFilters,
    node2FacetItem,
    props2FacetItem,
  );

  const filterDictionary = getFilterDictionary(dictionary, filteredNodes);

  return {
    ...state,
    filterDictionary,
    facetItemCount,
  };
};
