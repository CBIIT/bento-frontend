import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

/**
* set true to checked items
* @param {*} rows
* @param {*} table
* @returns
*/
export const setSelectedRows = (rows = [], table) => {
  const { selectedRows, dataKey } = table;
  const updateRows = [...rows].map((row) => {
    const isChecked = dataKey
      ? (selectedRows.indexOf(row[dataKey]) !== -1) : false;
    return { ...row, isChecked };
  }, []);
  return updateRows;
};

/**
* update query variable (eg active filters / files ids)
* with table pagination state
*/
const getPaginatedQueryVariables = (queryVariables, table) => {
  const variables = { ...queryVariables };
  const {
    page,
    rowsPerPage,
    sortBy,
    sortOrder,
  } = table;
  const offset = page * rowsPerPage;
  variables.offset = offset;
  variables.order_by = sortBy;
  variables.first = rowsPerPage;
  variables.sort_direction = sortOrder;
  return variables;
};

/**
 * @param {*} queryVariables
 * @param {*} table (table state)
 * @param {*} tab (tab)
 * @param {*} onSearchResultCount (callback to update search result count)
 * @returns table data
 */
export const getTableData = ({ queryVariables, table, onSearchResultCount }) => {
  const client = useApolloClient();
  const {
    page,
    rowsPerPage,
    sortOrder,
    query,
    sortBy,
  } = table;
  async function getData() {
    const paginatedqueryVariable = getPaginatedQueryVariables(queryVariables, table);
    const result = await client.query({
      query,
      variables: paginatedqueryVariable,
    })
      .then((response) => response.data);
    return result;
  }
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    getData().then((result) => {
      if (table.paginationAPIField && result[table.paginationAPIField]) {
        const apiResult = result[table.paginationAPIField];

        // Check if this is the new getFilenames structure with files and totalCount
        if (apiResult && typeof apiResult === 'object' && 'files' in apiResult && 'totalCount' in apiResult) {
          // Handle getFilenames response structure
          setTableData(apiResult.files);

          // Update total count for search results
          if (onSearchResultCount && apiResult.totalCount !== undefined) {
            onSearchResultCount(apiResult.totalCount);
          }
        } else {
          // Handle regular array response (fileOverview, etc.)
          setTableData(apiResult);

          // For non-search queries, don't update the count
          if (onSearchResultCount) {
            onSearchResultCount(null);
          }
        }
      } else {
        setTableData(result);
      }
    });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [queryVariables, page, rowsPerPage, sortOrder, sortBy, query, table.paginationAPIField]);
  return { tableData };
};
