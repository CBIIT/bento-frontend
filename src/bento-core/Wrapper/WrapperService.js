// import { useEffect, useState } from 'react';
import client from '../../utils/graphqlClient';

/**
* query varibales to fetch all the selected files id
*/
const getQueryVariables = (variables) => {
  const queryVariables = { ...variables };
  queryVariables.first = 100000;
  return queryVariables;
};

export const getFilesID = ({
  variables,
  query,
}) => {
  const queryVariables = getQueryVariables(variables);
  return async function getFileIDs() {
    const fetchResult = await client
      .query({
        query,
        variables: queryVariables,
      })
      .then((response) => response.data);
    return fetchResult;
  };
};

export const addAFiles = (files) => {
  console.log('add files');
  // store ids in the localstorage.
  const cartFilesId = JSON.parse(localStorage.getItem('CartFileIds')) || [];
  console.log(cartFilesId);
  console.log(files);
};
