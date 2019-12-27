import React from 'react';
import Page from '../../components/page';
import AddressesInner from './addresses-inner';

//----------------------------------------------------------------------
var Addresses = (props) => {
  var subpage = 'addresses/' + (props.match.params.subpage || 'custom');
  var inner = <AddressesInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Addresses;