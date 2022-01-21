import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DashboardContext } from 'bento-components';
import Dashboard from './dashboard';
import { Typography } from '../../components/Wrappers/Wrappers';

const DashboardController = (props) => {
  const { dashboardFunctions } = useContext(DashboardContext);

  useEffect(() => {
    dashboardFunctions.fetchDataForDashboardTabDataTable();
  }, []);

  const {
    isLoading, hasError, error, widgets, isFetched, isSidebarOpened,
  } = props;

  if (hasError) {
    return (
      <Typography variant="headline" color="error" size="sm">
        { error && `An error has occurred in loading dashboard component: ${error}`}
      </Typography>
    );
  }
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isFetched) {
    return (
      <Dashboard
        data={widgets}
        isSidebarOpened={isSidebarOpened}
      />
    );
  }
  return (
    <Typography variant="headline" size="sm">
      { error && `An error has occurred in loading stats component: ${error}`}
    </Typography>
  );
};

function mapStateToProps(state) {
  const {
    isLoading, isFetched, hasError, error, widgets,
  } = state.dashboardTab;

  const { isSidebarOpened } = state.layout;
  return {
    isLoading,
    hasError,
    error,
    widgets,
    isFetched,
    isSidebarOpened,
  };
}

export default connect(mapStateToProps)(DashboardController);
