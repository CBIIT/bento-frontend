import { facetSectionType, filterByNode } from "../../../controller/Filter";

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
      facetFilterData
    } = currState;
    const selectedFacetItems = facet2FacetItem[facet] || [];
    
    /**
    * STEP 1. Preserve Current Count for selected Facet 
    * If facet item is toggle the count of all the Facet Items
    * for selected facet should remain same
    */
    const prevFacetItemCount = {};
    selectedFacetItems.forEach(facetItem => {
      if (currFacetItemCount[facetItem]) {
        prevFacetItemCount[facetItem] = currFacetItemCount[facetItem];
      } else {
        prevFacetItemCount[facetItem] = [];
      }
    });

    /**
    * STEP 2. determine inclusion and exclusion to determine the node count
    * 
    */

    let nodeDataFilter = facetFilterData.filter(item => item.level === 'node');
    // console.log(nodeDataFilter);
    /**
    * top level filter - category
    */
    const categoryFilters = Object.keys(activeFilters.filterByNode)
      .filter(key => activeFilters.filterByNode[key] === 'category');

    const categoryNodeFilterData = categoryFilters.length === 0 ? nodeDataFilter
      : nodeDataFilter.filter((item) => categoryFilters.includes(item.category))
    // console.log('categoryNodeFilterData');
    // console.log(categoryNodeFilterData);

    /**
    * subject count for non active category facet item
    */
    // const nonCategoryFilters = Object.keys(activeFilters.filterByNode)
    //   .filter(key => activeFilters.filterByNode[key] !== 'category');
    // console.log(nonCategoryFilters);
    const nonCategoryFilters = Object.keys(activeFilters.filterByNode)
      .reduce((acc, key) => {
        if (activeFilters.filterByNode[key] !== 'category') {
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
    // console.log('nonCategoryNodeFilterData');
    // console.log(nonCategoryNodeFilterData);
    const nonCategoryNodes = nonCategoryNodeFilterData.map(item => item.nodeName);
    
    const nonActiveCategoryItem = facet2FacetItem.category
      .filter(item => !categoryFilters.includes(item));

    const nonCategoryNode2FaceItem = nonActiveCategoryItem.reduce((acc, facet) => {
      const nodes = node2FacetItem[facet];
      const filtered = nodes.filter(item => nonCategoryNodes.includes(item));
      acc[facet] = filtered;
      return acc;
    }, {});
    // console.log('nonCategoryNode2FaceItem');
    // console.log(nonCategoryNode2FaceItem);

    /**
    * inclusion / exclusion facet based on currently selected / target facet
    * current selected facet - count previous state
    */
    const { filterByNode: selectedNodeFacet } = selectedFacet;
    // console.log('console currently selected facet');
    // console.log(selectedNodeFacet);
    // console.log(selectedFacetItems);
    const selectedFacetFilters = Object.keys(activeFilters.filterByNode)
      .filter(key => activeFilters.filterByNode[key] === facet);
    // console.log('selectedFacetFilters');
    // console.log(selectedFacetFilters);

    /**
    * inclusive count
    * not category / not currectly selected facet
    */
    const inclusiveNodeFilterData =  selectedFacetFilters.length === 0 ? categoryNodeFilterData
     : categoryNodeFilterData.filter((item) => selectedFacetFilters.includes(item[facet]));

    const inclusiveNodes = inclusiveNodeFilterData.map(item => item.nodeName);

    // console.log('Check inclusive dataset');
    // console.log(inclusiveNodeFilterData);
    // console.log(inclusiveNodes);

    const inclusiveFacets = Object.keys(facet2FacetItem).reduce((acc, item) => {
      if (item !== 'category' && item !== facet) {
        acc[item] = facet2FacetItem[item];
      }
      return acc;
    }, {});

    // console.log('get all inclusive facets');
    // console.log(inclusiveFacets);
    // console.log(node2FacetItem);

    const inclusiveNode2FaceItem = Object.keys(node2FacetItem)
      .reduce((acc, facet) => {
        const nodes = node2FacetItem[facet];
        const filtered = nodes.filter(item => inclusiveNodes.includes(item));
        acc[facet] = filtered;
        return acc;
      }, {});

    // console.log(selectedNodeFacet);
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
    // console.log('check active filters');
    // console.log(activeFacetItems);

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
    
    // console.log(' exclusion data filter ');
    // console.log(exclusiveNodeFilterData);
    const exclusiveNodes = exclusiveNodeFilterData.map(item => item.nodeName);
    const exclusiveNode2FaceItem = Object.keys(activeFilters.filterByNode)
      .reduce((acc, facet) => {
        const nodes = node2FacetItem[facet];
        const filtered = nodes.filter(item => exclusiveNodes.includes(item));
        acc[facet] = filtered;
        return acc;
      }, {});
    
    // console.log(exclusiveNode2FaceItem);
    // console.log('CALCULATE overall ');
    // console.log({ ...inclusiveNode2FaceItem, ...exclusiveNode2FaceItem, ...prevFacetItemCount });

    return {
      facetItemCount: {
        ...inclusiveNode2FaceItem,
        ...exclusiveNode2FaceItem,
        ...nonCategoryNode2FaceItem,
        ...prevFacetItemCount,
      },
      filterNodes: exclusiveNodes,
    };
};