import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import OtherInner from './inner';
import { dispatcher_Other, other_menu } from './dispatchers';

//----------------------------------------------------------------------
class Other extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <OtherInner subpage={params} match={this.props.match} />;
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
