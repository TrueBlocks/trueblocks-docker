import React from 'react';
import Page from '../../components/page';
import [{PROPER}]Inner from './inner';
import { dispatcher_[{PROPER}], [{LOWER}]_menu } from './dispatchers';

//----------------------------------------------------------------------
class [{PROPER}] extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || '[{DEFAULT_MENU}]';
    params = params.replace('subpage=', '').replace('-', '/'); // weird cleanup
    return <[{PROPER}]Inner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default [{PROPER}];
export { dispatcher_[{PROPER}], [{LOWER}]_menu };
