import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW, tabContainers } from '../../bento/dashboardTabData';
import client from '../../utils/graphqlClient';
import useGenerateTabData from './tabs/hooks/useGenerateTabData';

const mockLogin = () => ({
  login: {
    ObjectIDP: "Google",
    __typename: "User",
    acl: [],
    creationDate: "Tue Apr 11 2023 15:18:56 GMT+0000 (Coordinated Universal Time)",
    editDate: "",
    email: "developer.bento@gmail.com",
    firstName: "Dev",
    isSignedIn: true,
    truelastName: "Bento",
    organization: "",
    role: "non-member",
    userID: "3dd73f75-5381-4582-b348-b9ea7e44d995",
    userStatus: "",
  }
});

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload, localFindAutocomplete,
  } = states;

  localStorage.setItem('userDetails', mockLogin());

  async function getData(activeFilters) {
    const result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: activeFilters,
    })
      .then((response) => response.data);
    return result;
  }

  const [dashData, setDashData] = useState(null);

  const activeFilters = {
    ...getFilters(filterState),
    subject_ids: [
      ...(localFindUpload || []).map((obj) => obj.subject_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result.searchSubjects) {
        setDashData(result.searchSubjects);
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);
  return { dashData, activeFilters };
};

const DashTemplateController = ((props) => {
  const { dashData, activeFilters } = getDashData(props);
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
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(DashTemplateController);
