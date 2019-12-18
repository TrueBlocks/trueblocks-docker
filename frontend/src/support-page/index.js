import React from 'react';
import Connection from '../components';
import SupportInner from './support-inner';

const Support = (props) => (
  <div className="page">
    <Connection props={props} />
    <SupportInner props={props} />
  </div>
);

export default Support;
