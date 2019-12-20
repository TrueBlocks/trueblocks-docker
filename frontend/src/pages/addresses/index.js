import React from 'react';
import Page from '../../components/page';
import AddressesInner from './addresses-inner';

//----------------------------------------------------------------------
export default class Addresses extends Page {
  render = () => {
    return <Page inner={<AddressesInner />} />;
  };
}