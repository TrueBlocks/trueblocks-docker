//------------------------------------------------------------------------
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import thunk from 'redux-thunk';
import rootReducer from './root-reducers';
import PersistentStore from './persistent-store';

export const history = createBrowserHistory();

const initialAppState = PersistentStore.loadState();
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(connectRouter(history)(rootReducer), initialAppState, composedEnhancers);

store.subscribe(() => {
  PersistentStore.saveState({
    reducer_Panels: store.getState().reducer_Panels,
    reducer_MainMenu: store.getState().reducer_MainMenu,
    reducer_LastLocation: store.getState().reducer_LastLocation
  });
});

export default store;
