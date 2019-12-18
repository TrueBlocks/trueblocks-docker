import React from 'react';
import Connection from '../components';
import OtherInner from './other-inner';

const Other = (props) => (
  <div className="page">
    <Connection props={props} />
    <OtherInner props={props} />
  </div>
);

export default Other;
