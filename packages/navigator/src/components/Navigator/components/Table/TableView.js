import React from 'react';
import {
  StyledTableContainer,
  StyledTableSummary
} from './Table.styled';
import CategoryView from './Category/CategoryView';
import { useModelContext } from '../../state/NavContextProvider';
/**
 * node list based on category
 * @param {Object} dictionary
 * @return {} mapping from category to node list
 */
export function category2NodeList(dictionary) {
  return Object.keys(dictionary || {}).reduce(
    (acc, nodeName) => {
      const node = dictionary[nodeName];
      const { category } = node;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(node);
      return acc;
    }, {});
};

/**
 * compute node and properties count
 * @param {*} dictionary 
 * @returns 
 */
const getNodePropertyCount = (dictionary) => {
  let nodesCount = 0;
  let propertiesCount = 0;
  Object.keys(dictionary).forEach(
    (nodeName, index) => {
      const node = dictionary[nodeName];
      nodesCount = index + 1;
      propertiesCount += Object.keys(node?.properties || []).length;
    }
  )
  return { nodesCount, propertiesCount};
};

/**
 * Little components presents an overview of the types in a dictionary organized by category
 *
 * @param {dictionary} params
 */
const TableView = ({
  dictionary
}) => {
  const { context = {}} = useModelContext();
  const { filterDictionary } = context;
  const node2Category = category2NodeList(filterDictionary || dictionary);
  const {
    nodesCount,
    propertiesCount
  } = getNodePropertyCount(filterDictionary || dictionary);
  return (
    <>
      <StyledTableSummary>
        <span> Dictionary has </span>
        <span>{nodesCount}</span>
        <span> nodes and </span>
        <span>{propertiesCount}</span>
        <span> properties </span>
      </StyledTableSummary>
      <div>
        {Object.keys(node2Category).map((category) => (
          <CategoryView
            key={category}
            nodes={node2Category[category]}
            category={category}
          />
        ))}
      </div>
    </>
  );
} 

export default TableView;
