import React, { Fragment } from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import ExploreInner from './inner';
import { dispatcher_Explore, explore_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Explore extends React.Component {
  getInner = () => {
    var item = utils.findMenu('explore', explore_menu, this.props.match);
    return <ExploreInner key={Math.random()} cur_submenu={item} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        The Explore module allows one to view the details of every transactions for each previously monitored address. \
        Because TrueBlocks runs on a local machine not a server, this means that you are restricted to exploring only \
        addresses that youve previously monitored.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Explore;
export { dispatcher_Explore, explore_menu };