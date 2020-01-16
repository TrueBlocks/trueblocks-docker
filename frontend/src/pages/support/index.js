import React, { Fragment } from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import SupportInner from './inner';
import { dispatcher_Support, support_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Support extends React.Component {
  getInner = () => {
    var item = utils.findMenu('support', support_menu, this.props.match);
    //return <Fragment>{JSON.stringify(item)}</Fragment>;
    console.log("Support::getInner")
    return <SupportInner key={Math.random()} cur_submenu={item} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        We provide various support options ranging from online email/forum discussions to full enterprise-level support \
        plans to suit your needs. Weve got you covered.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Support;
export { dispatcher_Support, support_menu };