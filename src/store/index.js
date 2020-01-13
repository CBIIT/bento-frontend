import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';


const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk, loggerMiddleware),
);

export default store;
