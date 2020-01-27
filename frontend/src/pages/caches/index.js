import React from 'react';
import { Page } from '../../components';
import CachesInner from './inner';
import { dispatcher_Caches, caches_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Caches extends React.Component {
  getInner = () => {
    var item = utils.findMenu('caches', caches_menu, this.props.match);
    return <CachesInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Caches;
export { dispatcher_Caches, caches_menu };
