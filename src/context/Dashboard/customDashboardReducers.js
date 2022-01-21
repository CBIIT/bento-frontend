import {
  DashboardReducers,
} from 'bento-components';

const customDashboardReducers = (defaultProps, dashboardFunctions) => {
  const defaultReducers = DashboardReducers(defaultProps, dashboardFunctions);
  // const { } = dashboardFunctions;
  // const { } = defaultProps;

  const customReducers = { };

  return { ...defaultReducers, ...customReducers };
};

export default customDashboardReducers;
