import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import client from '../../utils/graphqlClient';
import { getFilters } from '../../bento-core/FacetFilter/utils/filter';

const getDashData = (filterState) => {
  async function getData(activeFilters) {
    const result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: activeFilters,
    })
      .then((response) => response.data);
    return result;
  }

  const [dashData, setDashData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const activeFilters = getFilters(filterState);
    getData(activeFilters).then((result) => {
      if (result.searchSubjects) {
        setDashData(result.searchSubjects);
      }
    });
    return () => controller.abort();
  }, [filterState]);
  return { dashData };
};

const DashTemplateController = ((props) => {
  const { filterState } = props;
  const { dashData } = getDashData(filterState);

  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <DashTemplateView
      {...props}
      dashData={dashData}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

export default connect(mapStateToProps, null)(DashTemplateController);
