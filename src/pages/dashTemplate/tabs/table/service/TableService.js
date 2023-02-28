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

export const getTableData = (activeFilters, tab) => {
  const query = getQuery(tab.name);
  async function getData() {
    const result = await client.query({
      query,
      variables: activeFilters,
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
  }, [activeFilters]);
  return { tableData };
};

/**
* set true to checked items
* @param {*} rows
* @param {*} table
* @returns
*/
export const updateRowState = (rows, table) => {
  const { selectedRows, dataKey } = table;
  const updateRows = [...rows].map((row) => {
    let isChecked = false;
    if (selectedRows.indexOf(row[dataKey]) !== -1) {
      isChecked = true;
    }
    return { ...row, isChecked };
  }, []);
  return updateRows;
};
