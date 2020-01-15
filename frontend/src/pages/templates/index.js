import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import [{PROPER}]Inner from './inner';
import { dispatcher_[{PROPER}], [{LOWER}]_menu } from './dispatchers';

//----------------------------------------------------------------------
class [{PROPER}] extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <[{PROPER}]Inner subpage={params} match={this.props.match} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        [{PAGENOTES}]
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default [{PROPER}];
export { dispatcher_[{PROPER}], [{LOWER}]_menu };
