import { useApolloClient } from '@apollo/client';
/**
* query varibales to fetch all the selected files id
*/
export const getQueryVariables = (variables) => {
  const queryVariables = { ...variables };
  queryVariables.first = 100000;
  return queryVariables;
};

export const getFilesID = ({
  variables,
  query,
}) => {
  const queryVariables = getQueryVariables(variables);
  const client = useApolloClient();
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
