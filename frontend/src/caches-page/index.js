import React from 'react';
import ConnectionComponent from '../z_components';
import CachesInner from './caches-inner';

const Caches = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <CachesInner props={props} />
  </div>
);

export default Caches;
