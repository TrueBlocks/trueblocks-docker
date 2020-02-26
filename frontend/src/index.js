import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import { setup as setupWebsocket } from './websocket';
import App from './App';

import 'sanitize.css/sanitize.css';
import './index.css';

setupWebsocket();

const target = document.querySelector('#root');
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
