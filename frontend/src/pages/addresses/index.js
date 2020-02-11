import React from 'react';
import { Page } from 'components';
import AddressesInner from './inner';
import { dispatcher_Addresses, addresses_menu } from './dispatchers';
import { findMenu } from 'utils';

//----------------------------------------------------------------------
function Addresses({ match }) {
  return (
    <Page inner={<AddressesInner key={Math.random()} cur_submenu={findMenu('addresses', addresses_menu, match)} />} />
  );
}
export default Addresses;

export { dispatcher_Addresses, addresses_menu };
