import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import SupportInner from './inner';
import { dispatcher_Support, support_menu } from './dispatchers';

//----------------------------------------------------------------------
class Support extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <SupportInner subpage={params} match={this.props.match} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        We provide various support options ranging from online email/forum discussions to full enterprise-level support
        plans to suit your needs. We've got you covered.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Support;
export { dispatcher_Support, support_menu };
