import React, { Fragment } from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import AddressesInner from './inner';
import { dispatcher_Addresses, addresses_menu } from './dispatchers';
import * as utils from '../../utils';

//----------------------------------------------------------------------
class Addresses extends React.Component {
  getInner = () => {
    var item = utils.findMenu('addresses', addresses_menu, this.props.match);
    //return <Fragment>{JSON.stringify(item)}</Fragment>;
    console.log("Addresses::getInner")
    return <AddressesInner key={Math.random()} cur_submenu={item} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        Monitors are per-address index caches that enable fast reteival of transaction histories for any account. Note \
        that the transactions/logs/receipts/traces are not downloaded until you explore an address.
      </HelpPanel>
    );
  };

  render = () => {
    return <Page inner={this.getInner()} help={this.getHelp()} />;
  };
}
export default Addresses;
export { dispatcher_Addresses, addresses_menu };