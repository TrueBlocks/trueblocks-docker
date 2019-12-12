import React from 'react';
import ConnectionComponent from '../z_components';
import SupportInner from './support-inner';

const Support = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <SupportInner props={props} />
  </div>
);

export default Support;
