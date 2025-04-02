/**
* query varibales to fetch all the selected files id
*/
export const getQueryVariables = (variables) => {
  const queryVariables = { ...variables };
  queryVariables.first = 200000;
  return queryVariables;
};

export const getFilesID = ({
  client,
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
