// import { initFacetItemCount } from "../components/Filter/util/filter";

import { initFacetItemCount } from "../state/reducers/filter";

const exclusionItems = [
  'administrative',
  'analysis',
  'biospecimen',
  'case',
  'clinical',
  'clinical_trial',
];

const isExploredObject = (key, object) => {
  if(object[key]) {
    return true;
  }
  object[key] = true;
  return false;
}

export const facetSectionType = {
  filterByNode: 'filterByNode',
  filterByProperty: 'filterByProperty'
};

export const level = {
  NODE: 'node',
  PROPERTY: 'property'
};

export const filterByNode = ['category', 'assignment', 'class'];
export const filterByProperty = ['inclusion', 'display'];

/**
 * dataset to track nodes count
 */
const node2FacetItems = (
  facetFilterData
) => {
  let filterDataset = structuredClone(facetFilterData);
  const node2FacetItem = [...filterByNode, ...filterByProperty].reduce(
    (acc, facetItem) => {
      filterDataset.forEach(item => {
        if (item[facetItem]) {
          if(!acc[item[facetItem]]) {
            acc[item[facetItem]] = [];
          }
          if(!acc[item[facetItem]].includes(item.nodeName)) {
            acc[item[facetItem]].push(item.nodeName);
          }
        }
      });
      return acc;
  }, {});
  return node2FacetItem;
};

/**
 * dataset to track properties count
 */
const property2FacetItems = (
  facetFilterData
) => {
  let filterDataset = structuredClone(facetFilterData);
  const property2FacetItem = [...filterByNode, ...filterByProperty].reduce(
    (acc, facetItem) => {
      filterDataset.forEach(item => {
        if (item[facetItem]) {
          if(!acc[item[facetItem]]) {
            acc[item[facetItem]] = [];
          }
          if(item.propertyName && !acc[item[facetItem]].includes(item.propertyName)) {
            acc[item[facetItem]].push(item.propertyName);
          }
        }
      });
      return acc;
  }, {});
  return property2FacetItem;
}

/**
 * dataset to track properties count
 */
const facet2FacetItems = (
  filterSections
) => {
  const facet2FacetItem = {};
  for (let [facet, facetItem] of Object.entries(filterSections)) {
    facet2FacetItem[facet] = Object.keys(facetItem);
  }
  return facet2FacetItem;
};

const initializeFilterSectionState = (
  object,
  filterSection = {},
  facetSection
) => {
  Object.keys(filterSection).forEach((facet) => {
    const facetItem = object[facet];
    filterSection[facet][facetItem] = {
      isChecked: false,
      facetSection,
      facet,
      facetItem,
    }
  });
};

const getNodeDetails = ({
  id: nodeName,
  assignment,
  category,
  class: nodeClass
}) => ({
  nodeName,
  assignment,
  category,
  class: nodeClass,
  level: level.NODE
});

const getNodePropertyDetails = (node, property = {}) => {
  const {
    id: nodeName,
    assignment,
    category,
    class: nodeClass,
  } = node;
  const { display, inclusion, propertyName } = property;
  return {
    nodeName,
    propertyName,
    assignment,
    category,
    class: nodeClass,
    display,
    inclusion,
    level: level.PROPERTY
  };
};

/**
* 
* @param {*} dictionary 
* return 
*/
export const getFilterItems = (dictionary) => {
  // limit exploring nodes or properties 
  const exploredObject = {};

  const filterByNode = {
    category: {},
    assignment: {},
    class: {},
  };

  const filterByProperty = {
    inclusion: {},
    display: {},
  };

  // filter items
  const nodes = Object.keys(dictionary);

  // create data to filter (hide/display) nodes 
  // based on node / properties / relation
  const facetFilterData = nodes.reduce((acc, item, index) => {
    const node = dictionary[item];
    // filter by node 
    if (!isExploredObject(item, exploredObject)) {
      initializeFilterSectionState(
        node, 
        filterByNode, 
        facetSectionType.filterByNode
      );
    }
    acc.push(getNodeDetails(node));

    // iterate over each properties
    const nodeProperties = Object.keys(node.properties || {});
    if (nodeProperties.length > 0) {
      nodeProperties.forEach((key) => {
        // property
        const property = {
          propertyName: key,
          ...node.properties[key]
        };
        // console.log()
        const { display, propertyType } = property;
        if (!isExploredObject(display, exploredObject)
          || !isExploredObject(propertyType, exploredObject)){
          initializeFilterSectionState(
            property, 
            filterByProperty, 
            facetSectionType.filterByProperty
          );
        }
        // list of data to filter
        acc.push(getNodePropertyDetails(node, property));
      });
    }

    //filter by property
    return acc;
  }, []);

  // facet item count 
  if (!facetFilterData) {
    return {};
  }

  const facetItemCount = initFacetItemCount(facetFilterData);
  const node2FacetItem = node2FacetItems(facetFilterData);
  const props2FacetItem = property2FacetItems(facetFilterData);
  const facet2FacetItem = facet2FacetItems({ ...filterByNode, ...filterByProperty});

  return {
    filterByNode, 
    filterByProperty, 
    facetFilterData, 
    facetItemCount,
    node2FacetItem,
    facet2FacetItem,
    props2FacetItem
  };
};
