import React, { Fragment } from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import SignaturesInner from './inner';
import { dispatcher_Signatures, signatures_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Signatures extends React.Component {
  getInner = () => {
    var item = utils.findMenu('signatures', signatures_menu, this.props.match);
    return <SignaturesInner key={Math.random()} cur_submenu={item} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        TrueBlocks Signatures greatly speed up access to the Ethereum data; however, they take up a lot of space on your \
        hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Signatures;
export { dispatcher_Signatures, signatures_menu };