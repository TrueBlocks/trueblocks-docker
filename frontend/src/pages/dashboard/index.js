import React from 'react';
import { Page } from '../../components';
import DashboardInner from './inner';
import { dispatcher_Dashboard, dashboard_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Dashboard extends React.Component {
  getInner = () => {
    var item = utils.findMenu('dashboard', dashboard_menu, this.props.match);
    return <DashboardInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Dashboard;
export { dispatcher_Dashboard, dashboard_menu };