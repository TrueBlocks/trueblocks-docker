import React from 'react';
import Page from '../../components/page';
import DashboardInner from './dashboard-inner';

//----------------------------------------------------------------------
export default class Dashboard extends Page {
  render = () => {
    return <Page inner={<DashboardInner />} />;
  };
}