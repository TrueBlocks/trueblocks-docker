import React from 'react';
import Dashboard from './pages/dashboard';
import Addresses from './pages/addresses';
import Explore from './pages/explore';
import Indicies from './pages/indicies';
import Signatures from './pages/signatures';
import Caches from './pages/caches';
import Other from './pages/other';
import Settings from './pages/settings';
import Support from './pages/support';

export const routes = [
  {
    name: 'root',
    component: (routeProps) => (<Dashboard {...routeProps} />),
    exact: true,
    path: '/'
  },
  {
    name: 'addresses',
    component: (routeProps) => (<Addresses {...routeProps} />),
    path: '/addresses/:subpage?/:query?'
  },
  {
    name: 'explore',
    component: (routeProps) => (<Explore {...routeProps} />),
    path: '/explore/:subpage?/:query?'
  },
  {
    name: 'indicies',
    component: (routeProps) => (<Indicies {...routeProps} />),
    path:'/indicies/:subpage?/:query?'
  },
  {
    name: 'signatures',
    component: (routeProps) => (<Signatures {...routeProps} />),
    path:'/signatures/:subpage?/:query?'
  },
  {
    name: 'caches',
    component: (routeProps) => (<Caches {...routeProps} />),
    path:'/caches/:subpage?/:query?'
  },
  {
    name: 'other',
    component: (routeProps) => (<Other {...routeProps} />),
    path:'/other/:subpage?/:query?'
  },
  {
    name: 'settings',
    component: (routeProps) => (<Settings {...routeProps} />),
    path:'/settings/:subpage?/:query?'
  },
  {
    name: 'support',
    component: (routeProps) => (<Support {...routeProps} />),
    path:'/support/:subpage?/:query?'
  },
  {
    name: 'dashboard',
    component: (routeProps) => (<Dashboard {...routeProps} />),
    path:'/dashboard/:subpage/:query?'
  }
];

export default routes;
