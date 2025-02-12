import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { sideBarReducerGenerator } from '@bento-core/facet-filter';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';
import { cartReducerGenerator } from '@bento-core/cart';
import { LocalFindReducerGenerator } from '@bento-core/local-find';
import { LoginReducerGenerator } from '@bento-core/authentication';
import { getFromLocalStorage } from '../utils/localStorage';

const { localFind } = LocalFindReducerGenerator();
const { statusReducer } = sideBarReducerGenerator();
const { cartReducer } = cartReducerGenerator();
const { login } = LoginReducerGenerator(getFromLocalStorage);

const reducers = {
  layout,
  localFind,
  cartReducer,
  statusReducer,
  login,
  stats,
};

const store = configureStore({
  reducer: combineReducers(reducers),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
