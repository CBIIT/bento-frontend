/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-parens */
/* eslint-disable function-paren-newline */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable spaced-comment */
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
}

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
