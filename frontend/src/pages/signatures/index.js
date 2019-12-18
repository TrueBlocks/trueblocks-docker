import React from 'react';
import Connection from '../../components';
import SignaturesInner from './signatures-inner';

//----------------------------------------------------------------------
const Signatures = (props) => (
  <div className="page">
    <Connection props={props} />
    <SignaturesInner props={props} />
  </div>
);

//----------------------------------------------------------------------
export default Signatures;