import { useEffect, useState } from 'react';
import client from '../../../../../utils/graphqlClient';
import { GET_CASES_OVERVIEW_QUERY, GET_FILES_OVERVIEW_QUERY, GET_SAMPLES_OVERVIEW_QUERY } from '../../TableConfig';

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

export const addServie = '';
