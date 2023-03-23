import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW, tabContainers } from '../../bento/dashboardTabData';
import client from '../../utils/graphqlClient';
import { getFilters } from '../../bento-core/FacetFilter/utils/filter';
import useGenerateTabData from './tabs/hooks/useGenerateTabData';

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

  const activeFilters = getFilters(filterState);
  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result.searchSubjects) {
        setDashData(result.searchSubjects);
      }
    });
    return () => controller.abort();
  }, [filterState]);
  return { dashData, activeFilters };
};

const DashTemplateController = ((props) => {
  const { filterState } = props;
  const { dashData, activeFilters } = getDashData(filterState);
  const [activeTab, setActiveTab] = useState(0);

  const { generatedTabData } = useGenerateTabData({
    tabContainers, dashboardStats: dashData, activeFilters, activeTab,
  });

  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <DashTemplateView
      {...props}
      dashData={dashData}
      activeFilters={activeFilters}
      onTabChange={setActiveTab}
      tabData={generatedTabData}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

export default connect(mapStateToProps, null)(DashTemplateController);
