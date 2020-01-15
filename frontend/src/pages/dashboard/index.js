import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import DashboardInner from './inner';
import { dispatcher_Dashboard, dashboard_menu } from './dispatchers';

//----------------------------------------------------------------------
class Dashboard extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <DashboardInner subpage={params} match={this.props.match} />;
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
