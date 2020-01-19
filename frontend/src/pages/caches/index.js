import React, { Fragment } from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import CachesInner from './inner';
import { dispatcher_Caches, caches_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Caches extends React.Component {
  getInner = () => {
    var item = utils.findMenu('caches', caches_menu, this.props.match);
    return <CachesInner key={Math.random()} cur_submenu={item} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        TrueBlocks Caches greatly speed up access to the Ethereum data; however, they take up a lot of space on your \
        hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Caches;
export { dispatcher_Caches, caches_menu };