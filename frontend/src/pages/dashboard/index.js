import React from 'react';
import Page from '../../components/page';
import DashboardInner from './inner';

//----------------------------------------------------------------------
class Dashboard extends React.Component {
  getInner = () => {
    var subpage = 'dashboard/' + (this.props.match.params.subpage || '');
    return <DashboardInner subpage={subpage} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Dashboard;