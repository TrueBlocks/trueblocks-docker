import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import ExploreInner from './inner';
import { dispatcher_Explore, explore_menu } from './dispatchers';

//----------------------------------------------------------------------
class Explore extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <ExploreInner subpage={params} match={this.props.match} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        The Explore module allows one to view the details of every transactions for each previously monitored address.
        Because TrueBlocks runs on a local machine not a server, this means that you are restricted to exploring only
        addresses that you've previously monitored.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Explore;
export { dispatcher_Explore, explore_menu };
