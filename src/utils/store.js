/* eslint-disable import/no-unresolved */
import { createStore , applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
// eslint-disable-next-line perfectionist/sort-imports, import/no-extraneous-dependencies
import { createLogger } from 'redux-logger';
// eslint-disable-next-line perfectionist/sort-imports, import/no-extraneous-dependencies
import { thunk } from 'redux-thunk';
// eslint-disable-next-line perfectionist/sort-imports
import allreducers from 'src/reducers';
// eslint-disable-next-line import/newline-after-import

const loggerMiddleware = createLogger();

const store = createStore(
  allreducers,
  composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))
);
export default store;
