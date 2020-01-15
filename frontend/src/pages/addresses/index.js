import React from 'react';
import { Page } from '../../components';
import { HelpPanel } from '../../components';
import AddressesInner from './inner';
import { dispatcher_Addresses, addresses_menu } from './dispatchers';

//----------------------------------------------------------------------
class Addresses extends React.Component {
  getInner = () => {
    var params = this.props.match.params.query ? this.props.match.params.query.replace('-', '/') : '';
    return <AddressesInner subpage={params} match={this.props.match} />;
  };

  getHelp = () => {
    return (
      <HelpPanel>
        Monitors are per-address index caches that enable fast reteival of transaction histories for any account. Note
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
