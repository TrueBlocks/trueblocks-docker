import React from 'react';
import Page from '../../components/page';
import AddressesInner from './inner';
import { dispatcher_Addresses, addresses_menu } from './dispatchers';

//----------------------------------------------------------------------
class Addresses extends React.Component {
  getInner = () => {
    console.log('match: ', this.props.match);
    console.log('params: ', this.props.match.params);
    var query = this.props.match.params.query;
    if (query) query.replace('-', '?');
    console.log('query: ', query);
    return <AddressesInner subpage={query} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Addresses;
export { dispatcher_Addresses, addresses_menu };