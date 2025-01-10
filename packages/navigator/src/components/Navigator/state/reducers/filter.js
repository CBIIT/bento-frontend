import {
  facetSectionType,
  filterByNode,
  filterByProperty,
  level
 } from "../../controller/Filter";
import { updateNestedObject } from "../../utils/UpdateObject";

const facetType = {
  CATEGORY: 'category'
}

const inclusiveNodeFacet = {
  core: 'core',
  extended: 'extended',
  primary: 'primary',
  secondary: 'secondary'
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

export const getFacetItemCount = (
    selectedFacet,
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
    } = currState;
    const selectedFacetItems = facet2FacetItem[facet] || [];

    /**
    * all facet filter
    * calculate exclusion count
    */
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
     * refer to category node filter Data
     * recalculate item count for checked items
    */
    let activeCategoryFilterCount = {};
    if (exclusiveNodes.length === 0) {
      exclusiveNodes = categoryNodeFilterData.map(item => item.nodeName);
      const facetItems = [...categoryFilters, ...Object.keys(inclusiveNodeFacet)];
      activeCategoryFilterCount = facetItems.reduce((acc, facet) => {
        const nodes = node2FacetItem[facet];
        const filtered = nodes.filter(item => exclusiveNodes.includes(item));
        acc[facet] = filtered;
        return acc;
      }, {});
    }

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
};
