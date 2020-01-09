import React from 'react';
import Page from '../../components/page';
import AddressesInner from './inner';
import { dispatcher_Addresses, addresses_menu } from './dispatchers';

//----------------------------------------------------------------------
class Addresses extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'status/modes=monitors&details&ether';
    console.log('match: ', this.props.match);
    console.log('params: ', this.props.match.params);
    console.log('p1: ', params);
    params = params.replace('subpage=', '').replace('-', '/'); // weird cleanup
    console.log('p2: ', params);
    return <AddressesInner subpage={params} />;
  };

  render = () => {
    var inner = this.getInner();
    console.log(inner.props.subpage);
    return <Page inner={inner} />;
  };
}
export default Addresses;
export { dispatcher_Addresses, addresses_menu };
