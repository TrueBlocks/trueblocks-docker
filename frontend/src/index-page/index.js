import React from 'react';
import ConnectionComponent from '../z_components';
import IndexInner from './index-inner';

const Caches = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <IndexInner props={props} />
  </div>
);

export default Caches;
