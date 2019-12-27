import React from 'react';
import Page from '../../components/page';
import DashboardInner from './dashboard-inner';

//----------------------------------------------------------------------
var Dashboard = (props) => {
  var subpage = 'dashboard/' + (props.match.params.subpage || '');
  var inner = <DashboardInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Dashboard;