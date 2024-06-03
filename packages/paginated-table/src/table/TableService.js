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

let callCounter = 0;
export const getTableData = ({ queryVariables, table }) => {
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
    callCounter += 1;
    const currentCall = callCounter;
    getData().then((result) => {
      // Only update the table data if this is the most recent call
      if (currentCall === callCounter) {
        if (table.paginationAPIField && result[table.paginationAPIField]) {
          setTableData(result[table.paginationAPIField]);
        } else {
          setTableData(result);
        }
      }
    });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [queryVariables, page, rowsPerPage, sortOrder, sortBy]);
  return { tableData };
};
