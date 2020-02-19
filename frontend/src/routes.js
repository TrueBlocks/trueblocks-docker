import React from 'react';
import Dashboard from './pages/dashboard';
import Addresses from './pages/addresses';
import Explore from './pages/explore';
import Digests from './pages/digests';
import Signatures from './pages/signatures';
import Caches from './pages/caches';
import Other from './pages/other';
import Settings from './pages/settings';
import Support from './pages/support';

//------------------------------------------------------------
const routes = [
  {
    name: 'dashboard',
    component: (routeProps) => <Dashboard {...routeProps} />,
    exact: true,
    path: '/'
  },
  {
    name: 'addresses',
    component: (routeProps) => <Addresses {...routeProps} />,
    exact: true,
    path: '/addresses/:subpage?/:query?'
  },
  {
    name: 'explore',
    component: (routeProps) => <Explore {...routeProps} />,
    exact: true,
    path: '/explore/:subpage?/:query?'
  },
  {
    name: 'digests',
    component: (routeProps) => <Digests {...routeProps} />,
    exact: true,
    path: '/digests/:subpage?/:query?'
  },
  {
    name: 'signatures',
    component: (routeProps) => <Signatures {...routeProps} />,
    exact: true,
    path: '/signatures/:subpage?/:query?'
  },
  {
    name: 'caches',
    component: (routeProps) => <Caches {...routeProps} />,
    exact: true,
    path: '/caches/:subpage?/:query?'
  },
  {
    name: 'other',
    component: (routeProps) => <Other {...routeProps} />,
    exact: true,
    path: '/other/:subpage?/:query?'
  },
  {
    name: 'settings',
    component: (routeProps) => <Settings {...routeProps} />,
    exact: true,
    path: '/settings/:subpage?/:query?'
  },
  {
    name: 'support',
    component: (routeProps) => <Support {...routeProps} />,
    exact: true,
    path: '/support/:subpage?/:query?'
  }
];

export default routes;
