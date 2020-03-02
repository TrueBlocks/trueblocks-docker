import React from 'react';
import Dashboard from './pages/dashboard';
import Monitors from './pages/monitors';
import Names from './pages/names';
import Explore from './pages/explore';
import Digests from './pages/digests';
import Caches from './pages/caches';
import Settings from './pages/settings';
import Support from './pages/support';
import Addresses from './pages/addresses';

//------------------------------------------------------------
const routes = [
  {
    name: 'dashboard',
    component: (routeProps) => <Dashboard {...routeProps} />,
    exact: true,
    path: '/'
  },
  {
    name: 'monitors',
    component: (routeProps) => <Monitors {...routeProps} />,
    exact: true,
    path: '/monitors/:subpage?/:query?'
  },
  {
    name: 'names',
    component: (routeProps) => <Names {...routeProps} />,
    exact: true,
    path: '/names/:subpage?/:query?'
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
    name: 'caches',
    component: (routeProps) => <Caches {...routeProps} />,
    exact: true,
    path: '/caches/:subpage?/:query?'
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
  },
  {
    name: 'addresses',
    component: (routeProps) => <Addresses {...routeProps} />,
    exact: true,
    path: '/addresses/:subpage?/:query?'
  }
];

export default routes;
