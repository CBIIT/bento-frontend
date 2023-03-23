import { useEffect, useState } from 'react';
import client from '../../utils/graphqlClient';

/**
* set true to checked items
* @param {*} rows
* @param {*} table
* @returns
*/
export const setSelectedRows = (rows = [], table) => {
  const { selectedRows, dataKey } = table;
  const updateRows = [...rows].map((row) => {
    const isChecked = (selectedRows.indexOf(row[dataKey]) !== -1);
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
 * @returns table data
 */
export const getTableData = ({ queryVariables, table }) => {
  const {
    page,
    rowsPerPage,
    sortOrder,
    query,
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
        setTableData(result[table.paginationAPIField]);
      } else {
        setTableData(result);
      }
    });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [queryVariables, page, rowsPerPage, sortOrder]);
  return { tableData };
};
