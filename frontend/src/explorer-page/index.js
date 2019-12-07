import React from 'react';
import ConnectionComponent from '../z_components';
import ExplorerInner from './explorer-inner';

const Explorer = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <ExplorerInner props={props} />
  </div>
);

export default Explorer;
