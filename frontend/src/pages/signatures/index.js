import React from 'react';
import { Page } from '../../components';
import SignaturesInner from './inner';
import { dispatcher_Signatures, signatures_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Signatures extends React.Component {
  getInner = () => {
    var item = utils.findMenu('signatures', signatures_menu, this.props.match);
    return <SignaturesInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Signatures;
export { dispatcher_Signatures, signatures_menu };