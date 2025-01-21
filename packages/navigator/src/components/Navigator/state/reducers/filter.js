import {
  facetSectionType,
  filterByNode,
  filterByProperty,
  level
 } from "../../controller/Filter";
import {
  updateNestedObject,
  updateNestedValue
} from "../../utils/UpdateObject";

const facetType = {
  CATEGORY: 'category',
  ASSIGNMENT: 'assignment'
}

const inclusiveNodeFacet = {
  core: 'core',
  extended: 'extended',
  primary: 'primary',
  secondary: 'secondary'
};

const inclusivePropertyFacet = {
  inclusion: 'inclusion',
  display: 'display',
}

/**
 * identify the common items node or property
 */
export const getCommonItems = (arrays = []) => {
  if (arrays.length === 0) {
    return [];
  }
  if (arrays.length === 1) {
    return arrays[0];
  }
  const sorted = arrays
    .filter(item => item.length > 0)
    .sort((a, b) => a.length - b.length);
  // const minNodeArray = list.splice(0, 1);
  const commonItems = (sorted || []).reduce((common, array) =>
    {
      return common.filter(item => array.includes(item));
    }
  );

  // item atleast common two facets 
  if (commonItems.length === 0) {
    const combineArrays = sorted.reduce((acc, arry) => {
      acc.push(...arry);
      return acc;
    }, []);
    const elementCount = combineArrays.reduce((count, item) => {
      count[item] = (count[item] || 0) + 1;
      return count;
    }, {});
    // count repeated items
    const repeatedItems = Object.keys(elementCount)
      .filter(item => elementCount[item] > 1);
    return repeatedItems;
  }
  return commonItems;
};

const getActiveFiltersBySection = (filterItems) => {
  const activeFacetItems = Object.keys(filterItems || {})
    .reduce((acc, key) => {
      if (filterItems[key]) {
        const facet = filterItems[key];
        if(facet && !acc[facet]){
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
  const filterData = data.filter(row => {
    const facets = Object.keys(activeFilters);
    let match = true;
    facets.forEach(facet => {
      const selectedItems = activeFilters[facet] || [];
      if (!selectedItems.includes(row[facet])) {
        match = false;
      }
    });
    return match;
  });

  return filterData;
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
}

const filterNode2FacetItems = (node2FacetItem, filterNodes) => {
  const node2FacetItems = nonActiveCategoryItem.reduce((acc, facet) => {
    const nodes = node2FacetItem[facet];
    const filtered = nodes.filter(item => filterNodes.includes(item));
    acc[facet] = filtered;
    return acc;
  }, {});
  return node2FacetItems;
}

const getDistinctNode = (data) => {
  const distinctNodes = data.reduce(
    (acc, row) => {
    const { nodeName } = row;
    if (!acc.includes(nodeName)) {
      acc.push(nodeName);
    }
    return acc;
  }, []);
  return distinctNodes;
};

const getNodeCount = (node2FacetItem, facetItemList, nodeList) => {
  const count = facetItemList.reduce((acc, facet) => {
    const nodes = node2FacetItem[facet];
    const filtered = nodes.filter(item => nodeList.includes(item));
    acc[facet] = filtered;
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
  }, []);
  return distinctProperties;
};

const getItemCount = (facetItems2Objects, facetItemList, objectList) => {
  const count = facetItemList.reduce((acc, facet) => {
    const items = facetItems2Objects[facet];
    const selectedItems = items.filter(item => objectList.includes(item));
    acc[facet] = selectedItems;
    return acc;
  }, {});
  return count;
}

export const getFacetItemCount2 = (
  isChecked,
  facet,
  currState,
  activeFilters,
  node2FacetItem,
  props2FacetItem
) => {
  const {
    facetItemCount: currFacetItemCount, 
    facet2FacetItem,
    facetFilterData: dataset,
    filterDictionary,
  } = currState;
  const selectedFacetItems = facet2FacetItem[facet] || [];
  let facetFilterData = structuredClone(dataset);
  let resultSetData = dataset;

  /**
  * active facet items by sections
  * 
  */
  console.log("************************ FACET ITEM COUNT 2 ************************");
  const activeFiltersByNode = getActiveFiltersBySection(activeFilters?.filterByNode);
  console.log('activeFiltersByNode');
  console.log(activeFiltersByNode);
  const activeFiltersByProperty = getActiveFiltersBySection(activeFilters?.filterByProperty);
  console.log('activeFiltersByProperty');
  console.log(activeFiltersByProperty);

  const allActiveFacetItems = {
    ...activeFiltersByNode,
    ...activeFiltersByProperty
  };
  
  const activeCategoryFilters = activeFiltersByNode.category || [];
  console.log('activeCategoryFilters');
  console.log(activeCategoryFilters);
  const nonActiveCategoryFilters = (facet2FacetItem?.category || [])
    .filter(item => !activeCategoryFilters.includes(item));
  console.log("nonActiveCategoryFilters");
  console.log(nonActiveCategoryFilters);

  const nonCategoryActiveFilters = getNonCategoryFacetItem(allActiveFacetItems);
  console.log('nonCategoryActiveFilters');
  console.log(nonCategoryActiveFilters);

  const nonCategoryActiveFiltersByNode = getNonCategoryFacetItem(activeFiltersByNode);
  console.log('nonCategoryActiveFiltersByNode');
  console.log(nonCategoryActiveFiltersByNode);


  console.log('STEP 1. filter by property - dataset 1');
  const step1Dataset = filterData(facetFilterData, activeFiltersByProperty);
  const nodesByFilterProperty = getDistinctNode(step1Dataset);
  console.log(nodesByFilterProperty);

  facetFilterData = step1Dataset;

  console.log('STEP 2. filter by NODE - dataset 2');
  console.log("apply category filter to dataset 1");

  let step2Dataset = step1Dataset;
  if (activeCategoryFilters.length > 0) {
    step2Dataset = filterData(step1Dataset, {category: activeCategoryFilters});
  }

  console.log('STEP 3. dataset 1 -(filterDataByCategory)-> dataset 2 - Compute Node count -> Non Category - count1');
  let step3NodeList = getDistinctNode(step2Dataset);
  // console.log(nodeList1);
  const step3Facet2Count = [...facet2FacetItem.assignment, ...facet2FacetItem.class]; 
  let step3Count = getNodeCount(node2FacetItem, step3Facet2Count, step3NodeList);
  console.log(step3Count);
  // console.log(facet2FacetItem);

  console.log(' STEP 4 - Use non category active facet category node count - use nonCategoryActiveFiltersByNode');
  let step4Dataset = filterData(step1Dataset, nonCategoryActiveFiltersByNode);
  let step4NodeList = getDistinctNode(step4Dataset);
  let step4Count = getNodeCount(node2FacetItem, facet2FacetItem.category, step4NodeList);
  console.log(step4Count);

  console.log(' STEP 5 - count - nodeNonCategoryFacets');
  let step5Dataset = filterData(step2Dataset, nonCategoryActiveFiltersByNode);
  let step5NodeList = getDistinctNode(step5Dataset);
  console.log(step5NodeList);
  let step5Count = getNodeCount(node2FacetItem, step3Facet2Count, step5NodeList);
  console.log(step5Count);

  let step6Dataset = []; 
  let step6Count = {};
  if (facet === facetType.ASSIGNMENT && isChecked) {
    console.log('STEP - 6 - count item base on selected facet item');
    step6Dataset = filterData(step1Dataset,{[facet]: nonCategoryActiveFilters[facet] });
    let step6NodeList = getDistinctNode(step6Dataset);
    let step6Facet2Count = step3Facet2Count.filter(item => !(nonCategoryActiveFilters[facet] || []).includes(item))
    step6Count = getNodeCount(node2FacetItem, step6Facet2Count, step6NodeList);
    console.log(step6Count);
  }

  console.log('STEP - 7 - count property facet item');
  const propertyFacets = [...facet2FacetItem.display, ...facet2FacetItem.inclusion];
  let step7Dataset = filterData(dataset, activeFiltersByNode);
  let step7PropertyList = getDistinctObjects(step7Dataset, 'propertyName');
  let step7Count = getItemCount(props2FacetItem, propertyFacets, step7PropertyList)
  if (Object.keys(activeFiltersByProperty).length > 0) {
    console.log(activeFiltersByProperty);

  }
  console.log(step7Count);


  console.log("STEP n - SELECTED FACET");
  const prevFacetItemCount = {};
  selectedFacetItems.forEach(facetItem => {
    if (currFacetItemCount[facetItem]) {
      prevFacetItemCount[facetItem] = currFacetItemCount[facetItem];
    } else {
      prevFacetItemCount[facetItem] = [];
    }
  });
  console.log(prevFacetItemCount);

  const facetItemCount = {
    ...step3Count,
    ...step4Count,
    ...step5Count,
    ...step6Count,
    ...step7Count,
    ...prevFacetItemCount
  }

  console.log(facetItemCount);

  console.log("************************ FACET ITEM COUNT 2 ************************");
  return facetItemCount;

}

export const getFacetItemCount1 = (
  isChecked,
  facet,
  currState,
  activeFilters,
  node2FacetItem,
  props2FacetItem
) => {
  const {
    facetItemCount: currFacetItemCount, 
    facet2FacetItem,
    facetFilterData: dataset,
    filterDictionary,
  } = currState;
  const selectedFacetItems = facet2FacetItem[facet] || [];
  let facetFilterData = dataset;
  let resultSetData = dataset;
  /**
  * active facet items by sections
  * 
  */
  const activeFiltersByNode = getActiveFiltersBySection(activeFilters?.filterByNode);
  const activeFiltersByProperty = getActiveFiltersBySection(activeFilters?.filterByProperty);

  const allActiveFacetItems = {
    ...activeFiltersByNode,
    ...activeFiltersByProperty
  };

  const activeCategoryFilters = activeFiltersByNode.category || [];
  const nonCategoryActiveFilters = getNonCategoryFacetItem(allActiveFacetItems);

  /**
   * all non category filters
   */
  const allNonCategoryFilters = getNonCategoryFacetItem(facet2FacetItem);
  console.log(allNonCategoryFilters);
  // const allNonCategoryFilters = Object.keys(getNonCategoryFacetItem(facet2FacetItem))
  // .reduce((acc, face) => {

  // }, []);


  /**
  * filter data by property
  */
  const propertyFilterData = filterData(facetFilterData, activeFiltersByProperty);
  facetFilterData = propertyFilterData;

  /**
  * STEP 1. PREVIOUS / CURR STATE
  * Preserve Current Count for selected non active Facet items
  * Recount active filter item of the selected facet 
  * If facet item is toggle the count of all the Facet Items
  * for selected facet should remain same
  */
  const prevFacetItemCount = {};
  selectedFacetItems.forEach(facetItem => {
    if (currFacetItemCount[facetItem]) {
      const excludeFacetItems = allActiveFacetItems[facet] || [];
      if(!excludeFacetItems.includes(facetItem)) {
        prevFacetItemCount[facetItem] = currFacetItemCount[facetItem];
      }
    } else {
      prevFacetItemCount[facetItem] = [];
    }
  });

  /**
  * STEP 2. CATEGORY / NON CATEGORY FILTER
  * Create two datasets 1. apply category filter 2. apply non category filter
  * A. Dataset 1 used for count to all non category facet items 
  * B. Dataset 2 use to display all possible non active category facet items
  * Note - filter should show non active category facet items
  */

  /* Dataset 1 */
  const categoryNodeFilterData = activeCategoryFilters.length === 0 ? facetFilterData
    : facetFilterData.filter((item) => activeCategoryFilters.includes(item.category));
  
  const filterNonCatData = filterData(categoryNodeFilterData, nonCategoryActiveFilters);
  // console.log('nonCategoryActiveFilters');

  // console.log(nonCategoryActiveFilters);
  // console.log(filterNonCatData)
  const nonCategoryFiltersNode = filterNonCatData.map(item => item.nodeName);
  const nonCategoryFilterNodes = Array.from(new Set(nonCategoryFiltersNode));
  /*** Filter should display all possible non active category facet items ***/
  const nonActiveCategoryItem = facet2FacetItem.category
    .filter(item => !activeCategoryFilters.includes(item));

  /** non active category facet items count */
  const nonCategoryNode2FaceItem = nonActiveCategoryItem.reduce((acc, facet) => {
    const nodes = node2FacetItem[facet];
    const filtered = nodes.filter(item => nonCategoryFilterNodes.includes(item));
    acc[facet] = filtered;
    return acc;
  }, {});

  /* Dataset 2 - get possible category facet item*/
  const filterDataByNonCategoryFilter = filterData(facetFilterData, nonCategoryActiveFilters);
  // const filterDataByNonCategoryFilter = categoryNodeFilterData;
  const inclusiveCategoryNodes = filterDataByNonCategoryFilter.map(item => item.nodeName);
  const distinctNodes = Array.from(new Set(inclusiveCategoryNodes));
  // console.log(facet2FacetItem);
  const categoryNode2FaceItem = nonActiveCategoryItem.reduce((acc, facet) => {
    const nodes = node2FacetItem[facet];
    const filtered = nodes.filter(item => distinctNodes.includes(item));
    acc[facet] = filtered;
    return acc;
  }, {});
  // console.log('nonCategory Node2FaceItem');
  // console.log(nonCategoryNode2FaceItem);
  // console.log('non active category filter ');
  // console.log(categoryNode2FaceItem);

  const inclusiveNonCategoryFilter = categoryNodeFilterData.map(item => item.nodeName);
  const distinctNonCategoryNodes = Array.from(new Set(inclusiveNonCategoryFilter));

  // const nonCategoryNode2FaceItem2 = node2FacetItem.reduce((acc, facet) => {
  //   const nodes = node2FacetItem[facet];
  //   const filtered = nodes.filter(item => distinctNonCategoryNodes.includes(item));
  //   acc[facet] = filtered;
  //   return acc;
  // }, {});
  // console.log('nonCategoryNode2FaceItem2');
  // console.log(nonCategoryNode2FaceItem2);

  /**
  * STEP 3. SELECTED FACET ITEM 
  * A. Dataset 1 filter data based on current selected facet  
  * B. Dataset 2 - filter dataset 1 by all active filters 
  */
  const selectedFacetFilters = allActiveFacetItems[facet];
  /** Dataset 1 */
  const inclusiveNodeFilterData =  (selectedFacetFilters || []).length === 0 ? facetFilterData
    : facetFilterData.filter((item) => selectedFacetFilters.includes(item[facet]));

  const inclusiveNodes = inclusiveNodeFilterData.map(item => item.nodeName);
  /** inclusion count */
  const inclusiveNode2FaceItem = Object.keys(node2FacetItem)
    .reduce((acc, facet) => {
      const nodes = node2FacetItem[facet];
      const filtered = nodes.filter(item => inclusiveNodes.includes(item));
      acc[facet] = filtered;
      return acc;
    }, {});

  /** Dataset 2 */
  const exclusiveNodeFilterData = filterData(inclusiveNodeFilterData, allActiveFacetItems);
  
  /**
  * STEP 4 - find the nodes to be displayed
  * filter nodes to display graph and table view
  */
  let exclusiveNodes = exclusiveNodeFilterData.map(item => item.nodeName);
  let filteredNodes = Array.from(new Set(exclusiveNodes));

  const allActiveFacetItemsKeys = Object.keys(allActiveFacetItems);

  const exclusiveNode2FaceItem1 = allActiveFacetItemsKeys
    .reduce((acc, facet) => {
      (allActiveFacetItems[facet] || []).forEach(facetItem => {
        const nodes = node2FacetItem[facetItem] || [];
        const filtered = nodes.filter(item => filteredNodes.includes(item));
        acc[facetItem] = filtered;
      });
      return acc;
    }, {});
  
  console.log('exclusiveNode2FaceItem1');
  console.log(exclusiveNode2FaceItem1);
  /**
   * when combine filters yields no matching node
   * 1. UNCHECK - return current count or state 
   * 2. CHECK - refer to category node filter Data
   * recalculate item count for checked items
  */
  let activeCategoryFilterCount = {};
  if (filteredNodes.length === 0) {
    // on uncheck return current count 
    if (!isChecked) {
      const includeNodes = Object.keys(filterDictionary);
      const prevFilterDictionary = facetFilterData
        .filter(item => includeNodes.includes(item.nodeName));
      filteredNodes = prevFilterDictionary.map(item => item.nodeName);
      console.log('unchecked');
      return {
        ...currState,
        filterNodes: filteredNodes,
      };
    } else {

      // on check return category filter count
      filteredNodes = categoryNodeFilterData.map(item => item.nodeName);
    }
    const facetItems = [...activeCategoryFilters, ...Object.keys(inclusiveNodeFacet)];
    activeCategoryFilterCount = facetItems.reduce((acc, facet) => {
      const nodes = node2FacetItem[facet];
      const filtered = nodes.filter(item => filteredNodes.includes(item));
      acc[facet] = filtered;
      return acc;
    }, {});
  }

  // count properties
  // console.log(inclusiveNode2FaceItem);
  // console.log(exclusiveNode2FaceItem1);
  // console.log(nonCategoryNode2FaceItem);
  // console.log(prevFacetItemCount);
  // console.log(activeCategoryFilterCount);
  const nodeCount = {
    ...inclusiveNode2FaceItem,
    ...exclusiveNode2FaceItem1,
    ...nonCategoryNode2FaceItem,
    ...prevFacetItemCount,
    ...activeCategoryFilterCount
  };
  console.log(nodeCount);

  return {
    facetItemCount: {
      ...inclusiveNode2FaceItem,
      ...exclusiveNode2FaceItem1,
      ...nonCategoryNode2FaceItem,
      ...categoryNode2FaceItem,
      ...prevFacetItemCount,
      ...activeCategoryFilterCount
    },
    filterNodes: filteredNodes,
  };
};

export const getFacetItemCount = (
    isChecked,
    facet,
    currState,
    activeFilters,
    node2FacetItem,
    props2FacetItem
) => {
    const {
      facetItemCount: currFacetItemCount, 
      facet2FacetItem,
      facetFilterData,
      filterDictionary
    } = currState;
    const selectedFacetItems = facet2FacetItem[facet] || [];

    /**
    * all facet filter
    * calculate exclusion count
    */
    const sections = Object.keys(activeFilters);
    // const activeFacetItems1 = sections.reduce(
    //   (acc, section) => {
    //     Object.keys(activeFilters[section]).forEach(
    //       (item) => {
    //         const facet = activeFilters[section][item];
    //         if(!acc[facet]){
    //           acc[facet] = [];
    //         }
    //         acc[facet].push(item);
    //       }
    //     )
    //     return acc;
    //   }, {});
    // console.log(activeFacetItems1);
    const activeFacetItems = Object.keys(activeFilters.filterByNode)
      .reduce((acc, key) => {
        const facet = activeFilters.filterByNode[key];
        if(!acc[facet]){
          acc[facet] = [];
        }
        acc[facet].push(key);
        return acc;
      }, {});

    /**
    * STEP 1. 
    * Preserve Current Count for selected non active Facet items
    * Recount active filter item of the selected facet 
    * If facet item is toggle the count of all the Facet Items
    * for selected facet should remain same
    */
    const prevFacetItemCount = {};
    selectedFacetItems.forEach(facetItem => {
      if (currFacetItemCount[facetItem]) {
        const excludeFacetItems = activeFacetItems[facet] || [];
        if(!excludeFacetItems.includes(facetItem)) {
          prevFacetItemCount[facetItem] = currFacetItemCount[facetItem];
        }
      } else {
        prevFacetItemCount[facetItem] = [];
      }
    });

    /**
    * STEP 2. determine inclusion and exclusion to determine the node count
    * 
    */
    let nodeDataFilter = facetFilterData.filter(item => item.level === 'node');
    let nonNodeDataFilter = facetFilterData.filter(item => item.level !== 'node');
    console.log('nonNodeDataFilter');
    console.log(nonNodeDataFilter);
    /**
    * top level filter - category
    */
    const categoryFilters = Object.keys(activeFilters.filterByNode)
      .filter(key => activeFilters.filterByNode[key] === facetType.CATEGORY);

    const categoryNodeFilterData = categoryFilters.length === 0 ? nodeDataFilter
      : nodeDataFilter.filter((item) => categoryFilters.includes(item.category))

    /**
    * subject count for non active category facet item
    */
    const nonCategoryFilters = Object.keys(activeFilters.filterByNode)
      .reduce((acc, key) => {
        if (activeFilters.filterByNode[key] !== facetType.CATEGORY) {
          const facet = activeFilters.filterByNode[key];
          if(!acc[facet]){
            acc[facet] = [];
          }
          acc[facet].push(key);
        }
        return acc;
    }, {});

    const nonCategoryNodeFilterData = nodeDataFilter.filter(row => {
      let filter = false;
      Object.keys(nonCategoryFilters).forEach(
        item => {
          if (!nonCategoryFilters[item].includes(row[item])) {
            filter = true;
          }
        }
      )
      return !filter;
    });
    const nonCategoryNodes = nonCategoryNodeFilterData.map(item => item.nodeName);
    
    const nonActiveCategoryItem = facet2FacetItem.category
      .filter(item => !categoryFilters.includes(item));

    const nonCategoryNode2FaceItem = nonActiveCategoryItem.reduce((acc, facet) => {
      const nodes = node2FacetItem[facet];
      const filtered = nodes.filter(item => nonCategoryNodes.includes(item));
      acc[facet] = filtered;
      return acc;
    }, {});

    /**
    * inclusion / exclusion facet based on currently selected / target facet
    * current selected facet - count previous state
    */
    const selectedFacetFilters = Object.keys(activeFilters.filterByNode)
      .filter(key => activeFilters.filterByNode[key] === facet);

    /**
    * inclusive count
    * not category / not currectly selected facet
    */
    const inclusiveNodeFilterData =  selectedFacetFilters.length === 0 ? categoryNodeFilterData
     : categoryNodeFilterData.filter((item) => selectedFacetFilters.includes(item[facet]));

    const inclusiveNodes = inclusiveNodeFilterData.map(item => item.nodeName);
    const inclusiveNode2FaceItem = Object.keys(node2FacetItem)
      .reduce((acc, facet) => {
        const nodes = node2FacetItem[facet];
        const filtered = nodes.filter(item => inclusiveNodes.includes(item));
        acc[facet] = filtered;
        return acc;
      }, {});

    const exclusiveNodeFilterData = inclusiveNodeFilterData.filter(row => {
      let filter = false;
      Object.keys(activeFacetItems).forEach(
        item => {
          if (!activeFacetItems[item].includes(row[item])) {
            filter = true;
          }
        }
      )
      return !filter;
    });
    
    /**
    * filter nodes to display graph and table view
    */
    let exclusiveNodes = exclusiveNodeFilterData.map(item => item.nodeName);
    const exclusiveNode2FaceItem = Object.keys(activeFilters.filterByNode)
      .reduce((acc, facet) => {
        const nodes = node2FacetItem[facet];
        const filtered = nodes.filter(item => exclusiveNodes.includes(item));
        acc[facet] = filtered;
        return acc;
      }, {});
    
    /**
     * when combine filters yields no matching node
     * 1. UNCHECK - return current count or state 
     * 2. CHECK - refer to category node filter Data
     * recalculate item count for checked items
    */
    let activeCategoryFilterCount = {};
    if (exclusiveNodes.length === 0) {
      // on uncheck return current count 
      if (!isChecked) {
        const includeNodes = Object.keys(filterDictionary);
        const prevFilterDictionary = facetFilterData
          .filter(item => item.level === 'node' && includeNodes.includes(item.nodeName));
        exclusiveNodes = prevFilterDictionary.map(item => item.nodeName);
        // console.log('unchange any state');
        // return currState;
      } else {

        // on check return category filter count
        exclusiveNodes = categoryNodeFilterData.map(item => item.nodeName);
      }
      const facetItems = [...categoryFilters, ...Object.keys(inclusiveNodeFacet)];
      activeCategoryFilterCount = facetItems.reduce((acc, facet) => {
        const nodes = node2FacetItem[facet];
        const filtered = nodes.filter(item => exclusiveNodes.includes(item));
        acc[facet] = filtered;
        return acc;
      }, {});
    }
    console.log('return ')
    // count properties

    return {
      facetItemCount: {
        ...inclusiveNode2FaceItem,
        ...exclusiveNode2FaceItem,
        ...nonCategoryNode2FaceItem,
        ...prevFacetItemCount,
        ...activeCategoryFilterCount
      },
      filterNodes: exclusiveNodes,
    };
};

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
};

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
  };

  const selectedFacetItem = {
    filterSections: {
      ...currSelectedFacet
    }
  };

  // set active filters
  const {
    activeFilters = {},
    filterSections,
    facetItemCount: currFacetItemCount,
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

  // const currFacetItemsCount = Object.keys(filterSections[facetSection][facet])
  // .reduce((acc, item) => {
  //   if (currFacetItemCount) {
  //     acc[item] = currFacetItemCount[item];
  //   }
  //   return acc;
  // }, {});

  
  const { filterNodes } = getFacetItemCount1(
    isChecked,
    facet,
    currState,
    activeFilters,
    node2FacetItem,
    props2FacetItem
  );

  const facetItemCount = getFacetItemCount2(
    isChecked,
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
};

export const getInitState = (state) => {
  const cloneState = structuredClone(state);
  const { 
    dictionary, 
    filterSections,
    node2FacetItem, 
    props2FacetItem
  } = cloneState;

  /**
  * uncheck all filters
  * reset active filters
  */
  updateNestedValue(filterSections, false, 'isChecked');

  return {
    ...cloneState,
    activeFilters: {},
    filterDictionary: dictionary,
    facetItemCount: {
      ...node2FacetItem,
      ...props2FacetItem
    },
    filterSections
  };
};
