import { useEffect, useState } from 'react';
import {
  GET_CASES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_FILES_OVERVIEW_QUERY,
} from '../../../../../bento/dashboardTabData';
import client from '../../../../../utils/graphqlClient';

const getQuery = (tab) => {
  switch (tab) {
    case 'Cases':
      return GET_CASES_OVERVIEW_QUERY;
    case 'Samples':
      return GET_SAMPLES_OVERVIEW_QUERY;
    default:
      return GET_FILES_OVERVIEW_QUERY;
  }
};

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

export const getTableData = ({ activeFilters, table, tab }) => {
  const query = getQuery(tab.name);
  const {
    page,
    rowsPerPage,
    sortOrder,
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
    getData().then((result) => {
      if (result[tab.paginationAPIField]) {
        setTableData(result[tab.paginationAPIField]);
      }
    });
  }, [activeFilters, page, rowsPerPage, sortOrder]);
  return { tableData };
};
