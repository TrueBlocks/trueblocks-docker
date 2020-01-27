import React from 'react';
import { Page } from '../../components';
import SupportInner from './inner';
import { dispatcher_Support, support_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Support extends React.Component {
  getInner = () => {
    var item = utils.findMenu('support', support_menu, this.props.match);
    return <SupportInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Support;
export { dispatcher_Support, support_menu };