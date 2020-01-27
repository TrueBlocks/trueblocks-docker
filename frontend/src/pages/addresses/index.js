import React from 'react';
import { Page } from '../../components';
import AddressesInner from './inner';
import { dispatcher_Addresses, addresses_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Addresses extends React.Component {
  getInner = () => {
    var item = utils.findMenu('addresses', addresses_menu, this.props.match);
    return <AddressesInner key={Math.random()} cur_submenu={item} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Addresses;
export { dispatcher_Addresses, addresses_menu };