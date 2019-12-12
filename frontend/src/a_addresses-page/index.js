import React from 'react';
import ConnectionComponent from '../z_components';
import AddressIndexInner from './addresses-inner';

const AddressIndex = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <AddressIndexInner props={props} />
  </div>
);

export default AddressIndex;
