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
* update table data based on
* 1. paginated table value
* 2. active filters
*/
const getQueryVariables = (activeFilters, table) => {
  const variables = { ...activeFilters };
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
 * @param {*} activefilters
 * @param {*} table (table state)
 * @param {*} tab (tab)
 * @returns table data
 */
export const getTableData = ({ activeFilters, table }) => {
  const {
    page,
    rowsPerPage,
    sortOrder,
    query,
  } = table;
  async function getData() {
    const queryVariable = getQueryVariables(activeFilters, table);
    const result = await client.query({
      query,
      variables: queryVariable,
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
  }, [activeFilters, page, rowsPerPage, sortOrder]);
  return { tableData };
};

export const addAllFiles = (activeFilters, query) => {
  async function getData() {
    const queryVariable = { ...activeFilters };
    const result = await client.query({
      query,
      variables: queryVariable,
    })
      .then((response) => response.data);
    return result;
  }
  getData(); // .then((result) => console.log(result));
};

export const addSelectedFiles = (selectedIds, query) => {
  async function getData() {
    const result = await client.query({
      query,
      variables: selectedIds,
    })
      .then((response) => response.data);
    return result;
  }
  getData(); // .then((result) => console.log(result));
};
