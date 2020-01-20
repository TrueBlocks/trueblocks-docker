import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import [{PROPER}]Inner from './inner';
import { dispatcher_[{PROPER}], [{LOWER}]_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class [{PROPER}] extends React.Component {
  getInner = () => {
    var item = utils.findMenu('[{LOWER}]', [{LOWER}]_menu, this.props.match);
    return <[{PROPER}]Inner key={Math.random()} cur_submenu={item} />;
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
