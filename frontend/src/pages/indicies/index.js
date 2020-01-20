import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import IndiciesInner from './inner';
import { dispatcher_Indicies, indicies_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Indicies extends React.Component {
  getInner = () => {
    var item = utils.findMenu('indicies', indicies_menu, this.props.match);
    return <IndiciesInner key={Math.random()} cur_submenu={item} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        TrueBlocks index of appearances greatly speed up access to the Ethereum data; however, they take up a lot of \
        space on your hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too \
        big.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Indicies;
export { dispatcher_Indicies, indicies_menu };
