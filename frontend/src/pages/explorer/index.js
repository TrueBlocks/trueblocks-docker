import React from 'react';
import Connection from '../../components';
import ExplorerInner from './explorer-inner';

//----------------------------------------------------------------------
const Explorer = (props) => (
  <div className="page">
    <Connection props={props} />
    <ExplorerInner props={props} />
  </div>
);

//----------------------------------------------------------------------
export default Explorer;