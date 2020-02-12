import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './App';

import 'sanitize.css/sanitize.css';
import './index.css';

import fly50 from './skins/fly50';
import control_everything from './skins/control_everything';
import love_apart from './skins/love_apart';

let skins = [];
skins['fly50'] = fly50;
skins['control_everything'] = control_everything;
skins['love_apart'] = love_apart;

let root = document.documentElement;
let skin = skins['love_apart']; //process.env.SKIN];
root.style.setProperty('--color-border-primary', skin.colorBorderPrimary);
root.style.setProperty('--color-table-border', skin.colorTableBorder);
root.style.setProperty('--color-background-primary', skin.colorBackgroundPrimary);
root.style.setProperty('--color-background-secondary', skin.colorBackgroundSecondary);
root.style.setProperty('--color-text-primary', skin.colorTextPrimary);
root.style.setProperty('--color-table-text', skin.colorTableText);
root.style.setProperty('--color-table-header-bg', skin.colorTableHeaderBg);
root.style.setProperty('--color-table-body-bg', skin.colorTableBodyBg);
root.style.setProperty('--color-hover', skin.colorHover);
root.style.setProperty('--data-table-width', skin.dataTableWidth);

const target = document.querySelector('#root');
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
