import React from 'react';
import { Page } from '../../components';
import DigestsInner from './inner';
import { dispatcher_Digests, digests_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Digests extends React.Component {
  getInner = () => {
    var item = utils.findMenu('digests', digests_menu, this.props.match);
    return <DigestsInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Digests;
export { dispatcher_Digests, digests_menu };
