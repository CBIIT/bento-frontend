/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import { initFacetItemCount } from '../state/reducers/filter';
import {
  filterByNode,
  filterByProperty,
  facetSectionType,
  level,
} from '../constant/Filter';
import { safeClone } from '../utils/Utils';

const isExploredObject = (key, object) => {
  if (object[key]) {
    return true;
  }
  object[key] = true;
  return false;
};

/**
 * dataset to track nodes count
 */
const node2FacetItems = (
  facetFilterData,
) => {
  const filterDataset = safeClone(facetFilterData);
  const node2FacetItem = [...filterByNode, ...filterByProperty].reduce(
    (acc, facetItem) => {
      filterDataset.forEach((item) => {
        if (item[facetItem]) {
          if (!acc[item[facetItem]]) {
            acc[item[facetItem]] = [];
          }
          if (!acc[item[facetItem]].includes(item.nodeName)) {
            acc[item[facetItem]].push(item.nodeName);
          }
        }
      });
      return acc;
    }, {},
  );
  return node2FacetItem;
};

/**
 * dataset to track properties count
 */
const property2FacetItems = (
  facetFilterData,
) => {
  const filterDataset = safeClone(facetFilterData);
  const property2FacetItem = [...filterByNode, ...filterByProperty].reduce(
    (acc, facetItem) => {
      filterDataset.forEach((item) => {
        if (item[facetItem]) {
          if (!acc[item[facetItem]]) {
            console.log(item[facetItem]);
            acc[item[facetItem]] = [];
          }
          if (item.propertyId) {
            acc[item[facetItem]].push(item.propertyId);
          }
        }
      });
      return acc;
    }, {},
  );
  return property2FacetItem;
};

/**
 * dataset to track properties count
 */
const facet2FacetItems = (
  filterSections,
) => {
  const facet2FacetItem = {};
  Object.entries(filterSections).forEach(([facet, facetItem]) => {
    facet2FacetItem[facet] = Object.keys(facetItem);
  });
  // for (let [facet, facetItem] of Object.entries(filterSections)) {
  //   facet2FacetItem[facet] = Object.keys(facetItem);
  // }
  return facet2FacetItem;
};

const initializeFilterSectionState = (
  object,
  filterSection = {},
  facetSection,
) => {
  Object.keys(filterSection).forEach((facet) => {
    const facetItem = object[facet];
    filterSection[facet][facetItem] = {
      isChecked: false,
      facetSection,
      facet,
      facetItem,
    };
  });
};

const getNodeDetails = ({
  id: nodeName,
  assignment,
  category,
  class: nodeClass,
}) => ({
  nodeName,
  assignment,
  category,
  class: nodeClass,
  level: level.NODE,
});

const getNodePropertyDetails = (node, property = {}) => {
  const {
    id: nodeName,
    assignment,
    category,
    class: nodeClass,
  } = node;
  const {
    display,
    inclusion,
    propertyName,
    propertyId,
  } = property;
  return {
    nodeName,
    propertyId,
    propertyName,
    assignment,
    category,
    class: nodeClass,
    display,
    inclusion,
    level: level.PROPERTY,
  };
};

/**
*
* @param {*} dictionary
* return
*/
export const getFilterItems = (dictionary) => {
  const exploredObject = {};
  const filterByNodeItems = {
    category: {},
    assignment: {},
    class: {},
  };

  const filterByPropertyItems = {
    inclusion: {},
    display: {},
  };

  // filter items
  const nodes = Object.keys(dictionary);
  // create data to filter (hide/display) nodes
  // based on node / properties / relation
  const facetFilterData = nodes.reduce((acc, item) => {
    const node = dictionary[item];
    // filter by node
    if (!isExploredObject(item, exploredObject)) {
      initializeFilterSectionState(
        node,
        filterByNodeItems,
        facetSectionType.filterByNode,
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
          ...node.properties[key],
        };

        const { display, propertyType } = property;
        if (!isExploredObject(display, exploredObject)
          || !isExploredObject(propertyType, exploredObject)) {
          initializeFilterSectionState(
            property,
            filterByPropertyItems,
            facetSectionType.filterByProperty,
          );
        }
        // list of data to filter
        acc.push(getNodePropertyDetails(node, property));
      });
    }
    return acc;
  }, []);

  // facet item count
  if (!facetFilterData) {
    return {};
  }
  const facetItemCount = initFacetItemCount(facetFilterData);
  const node2FacetItem = node2FacetItems(facetFilterData);
  const props2FacetItem = property2FacetItems(facetFilterData);
  const facet2FacetItem = facet2FacetItems({ ...filterByNodeItems, ...filterByPropertyItems });

  return {
    filterByNode: filterByNodeItems,
    filterByProperty: filterByPropertyItems,
    facetFilterData,
    facetItemCount,
    node2FacetItem,
    facet2FacetItem,
    props2FacetItem,
  };
};
