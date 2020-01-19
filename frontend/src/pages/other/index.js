import React, { Fragment } from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import OtherInner from './inner';
import { dispatcher_Other, other_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Other extends React.Component {
  getInner = () => {
    var item = utils.findMenu('other', other_menu, this.props.match);
    return <OtherInner key={Math.random()} cur_submenu={item} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        The Other panel allows you to configure various other items related to TrueBlocks. This panel allows for many things including some other stuff.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Other;
export { dispatcher_Other, other_menu };