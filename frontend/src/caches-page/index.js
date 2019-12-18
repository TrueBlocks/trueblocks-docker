import React from 'react';
import Connection from '../components';
import CachesInner from './caches-inner';

const Caches = (props) => (
  <div className="page">
    <Connection props={props} />
    <CachesInner props={props} />
  </div>
);

export default Caches;
