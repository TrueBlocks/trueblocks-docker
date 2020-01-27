import React from 'react';
import { Page } from '../../components';
import ExploreInner from './inner';
import { dispatcher_Explore, explore_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Explore extends React.Component {
  getInner = () => {
    var item = utils.findMenu('explore', explore_menu, this.props.match);
    return <ExploreInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Explore;
export { dispatcher_Explore, explore_menu };