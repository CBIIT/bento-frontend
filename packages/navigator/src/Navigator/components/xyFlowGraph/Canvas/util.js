/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-spacing */
/* eslint-disable prefer-const */
import _ from 'underscore';

export const nodeColor = (node) => {
  switch (node.category) {
    case 'administrative':
        return '#9B2D20';
    case 'study':
        return '#9875FF';
    case 'case':
        return '#FF7F15';
    case 'clinical_trial':
        return '#00A1BB';
    case 'biospecimen':
        return '#00785A';
    case 'analysis':
        return '#B533A9';
    case 'data_file':
        return '#00AD0E';
    case 'clinical':
        return '#1C75BC';
    default:
        return '#ff0072';
  }
};

/**
 * Get a set of types from an array of nodes
 * @param {Node[]} nodes
 * @returns {string[]} array of type names(duplicating names removed) of given nodes
 */
 export const getDistinctCategoryItems = (nodes) => _.uniq(nodes.map((node) => node.category));

 /**
 * Get a set of types from an array of nodes
 * @param {categories[]} categories
 * @returns {string[]} array of type names(duplicating names removed) of given nodes
 */
 export const getCategoryIconUrl = (categories, url) => {
  const urls = {};
  categories.forEach((category) => {
    urls[category] = `${url}graph/${category}.svg`;
  });
  return urls;
 };

 /**
  * Active Search Mode 
  * set node title for matching query 
  */
 export const setMatchingNodeTitle = (searchResult = []) => {
    let matchedNodeNameIndices = {};
    searchResult.forEach((item) => {
      item.matches.forEach((matchItem) => {
          const { value, key } = matchItem;
        if (key === 'title') {
          matchedNodeNameIndices[value] = matchItem.indices;
        }
      });
    });
    return matchedNodeNameIndices;
 }

/**
 * set zoom based on width
 */
export const getMinZoom = ({width, minZoom}) => width > 1450 ? 0.75 : minZoom;
