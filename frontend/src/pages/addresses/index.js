//---------------------------------------------------------------------
import React from 'react';
import Connection from '../../components';
import AddressesInner from './addresses-inner';

//---------------------------------------------------------------------
const Addresses = (props) => {
  return (
    <div className="page">
      <Connection props={props} />
      <AddressesInner {...props} />
    </div>
  );
};

export default Addresses;
