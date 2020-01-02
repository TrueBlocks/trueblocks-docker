import React from 'react';
import Page from '../../components/page';
import DashboardInner from './inner';

//----------------------------------------------------------------------
class Dashboard extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || '';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <DashboardInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Dashboard;