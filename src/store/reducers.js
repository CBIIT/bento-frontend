import { combineReducers } from 'redux';
import layout from '../components/Layout/LayoutState';
// import dashboard from '../';
import dashboard from '../pages/dashboard/dashboardState';
import dashboardTab from '../pages/dashboardTab/store/dashboardReducer';
import stats from '../components/Stats/StatsState';
import cart from '../pages/fileCentricCart/store/cartReducer';

export default combineReducers({
  layout,
  dashboard,
  dashboardTab,
  cart,
  stats,
});
