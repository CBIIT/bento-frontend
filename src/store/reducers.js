import { combineReducers } from 'redux';
import layout from '../components/Layout/LayoutState';
// import dashboard from '../';
import dashboard from '../pages/dashboard/dashboardState';
import stats from '../components/Stats/StatsState';
import cart from '../pages/selectedCases/selectedCasesState';

export default combineReducers({
  layout,
  dashboard,
  cart,
  stats,
});
