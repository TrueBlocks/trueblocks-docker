//---------------------------------------------------------------------
import React from 'react';
import Connection from '../components';
import DashboardInner from './dashboard-inner';

//---------------------------------------------------------------------
const Dashboard = (props) => (
  <div className="page">
    <Connection props={props} />
    <DashboardInner props={props} />
  </div>
);

export default Dashboard;
