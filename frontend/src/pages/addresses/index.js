import React from 'react';
import Page from '../../components/page';
import AddressesInner from './addresses-inner';

//----------------------------------------------------------------------
var Addresses = (props) => {
  var subpage = props.match.params.subpage ? props.match.params.subpage : 'addresses/custom';
  var inner = <AddressesInner subpage={subpage} />;
  return <Page inner={inner} />;
};
export default Addresses;