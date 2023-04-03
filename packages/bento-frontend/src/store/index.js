import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import layout from '../components/Layout/LayoutState';
import dashboard from '../pages/dashboard/dashboardState';
import stats from '../components/Stats/StatsState';
import { sideBarReducerGenerator } from '../bento-core/FacetFilter/store/reducers/SideBarReducer';
import { LocalFindReducerGenerator } from '@bento-core/local-find';

const { statusReducer } = sideBarReducerGenerator();
const { localFind } = LocalFindReducerGenerator();

const reducers = {
  localFind,
  statusReducer,
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
