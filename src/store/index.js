import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import layout from '../components/Layout/LayoutState';
import dashboard from '../pages/dashboard/dashboardState';
import stats from '../components/Stats/StatsState';
import { sideBarReducerGenerator } from '../bento-core/FacetFilter/store/reducers/SideBarReducer';
import { cartReducerGenerator } from '../bento-core/Cart/store/reducers';

const { statusReducer } = sideBarReducerGenerator();
const { cartReducer } = cartReducerGenerator();

const reducers = {
  statusReducer,
  cartReducer,
  layout,
  dashboard,
  stats,
};
const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(applyMiddleware(ReduxThunk, loggerMiddleware)),
);

store.injectReducer = (key, reducer) => {
  reducers[key] = reducer;
  store.replaceReducer(combineReducers(reducers));
};

export default store;
