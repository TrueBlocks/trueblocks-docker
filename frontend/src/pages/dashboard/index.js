import React, { Fragment } from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import DashboardInner from './inner';
import { dispatcher_Dashboard, dashboard_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Dashboard extends React.Component {
  getInner = () => {
    var item = utils.findMenu('dashboard', dashboard_menu, this.props.match);
    //return <Fragment>{JSON.stringify(item)}</Fragment>;
    console.log("Dashboard::getInner")
    return <DashboardInner key={Math.random()} cur_submenu={item} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        Learn about the TrubBlocks project, our organization, our philosopy towards decentralization, and our team.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Dashboard;
export { dispatcher_Dashboard, dashboard_menu };