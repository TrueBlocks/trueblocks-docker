import React from 'react';
import { Page } from '../../components';
import IndiciesInner from './inner';
import { dispatcher_Indicies, indicies_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Indicies extends React.Component {
  getInner = () => {
    var item = utils.findMenu('indicies', indicies_menu, this.props.match);
    return <IndiciesInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Indicies;
export { dispatcher_Indicies, indicies_menu };
