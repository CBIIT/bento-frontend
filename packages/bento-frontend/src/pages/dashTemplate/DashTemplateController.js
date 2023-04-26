import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect,useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import {clearFacetSection} from '@bento-core/facet-filter';
import { facetsConfig } from '../../bento/dashTemplate';

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload, localFindAutocomplete,
  } = states;

  const client = useApolloClient();
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
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(clearFacetSection(facetsConfig[0]));
  },[]);

  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <DashTemplateView
      {...props}
      dashData={dashData}
      activeFilters={activeFilters}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(DashTemplateController);