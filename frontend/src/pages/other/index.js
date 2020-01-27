import React from 'react';
import { Page } from '../../components';
import OtherInner from './inner';
import { dispatcher_Other, other_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Other extends React.Component {
  getInner = () => {
    var item = utils.findMenu('other', other_menu, this.props.match);
    return <OtherInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Other;
export { dispatcher_Other, other_menu };