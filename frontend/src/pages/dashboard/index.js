import React from 'react';
import Page from '../../components/page';
import DashboardInner from './dashboard-inner';

//----------------------------------------------------------------------
var Dashboard = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'dashboard/';
  var inner = <DashboardInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Dashboard;