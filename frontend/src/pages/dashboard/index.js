import React from 'react';
import { Page } from 'components';
import DashboardInner from './inner';
import { dispatcher_Dashboard, dashboard_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Dashboard({ match }) {
  return (
    <Page inner={<DashboardInner key={Math.random()} cur_submenu={findMenu('dashboard', dashboard_menu, match)} />} />
  );
}
export default Dashboard;

export { dispatcher_Dashboard, dashboard_menu };
